import { describe, it, expect, beforeEach, vi } from 'vitest';
import { contactFormSchema, contactApiSchema } from '../src/lib/validation';
import { checkRateLimit, getClientIp, resetRateLimitStore } from '../src/lib/rateLimit';
import { inquiries } from '../src/lib/schema';
import { sendInquiryNotification } from '../src/lib/email';
import { POST } from '../src/app/api/contact/route';

describe('Phase 9: Contact Form Backend & Validation Test Suite', () => {
  // ── A. Validation Tests ──
  describe('Zod Validation (src/lib/validation.ts)', () => {
    const validFormData = {
      name: 'Rajesh Kumar',
      email: 'rajesh@apexmanufacturing.com',
      phone: '+91 98765 43210',
      company: 'Apex Manufacturing Ltd.',
      service: 'Factory / Industrial Videos',
      message: 'We require a full plant walkthrough and equipment documentation for our facility in Rudrapur.',
    };

    it('validates a correct form payload successfully', () => {
      const result = contactFormSchema.safeParse(validFormData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('rajesh@apexmanufacturing.com');
        expect(result.data.name).toBe('Rajesh Kumar');
      }
    });

    it('rejects payload when name is missing or too short', () => {
      const result = contactFormSchema.safeParse({ ...validFormData, name: 'A' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 2 characters');
      }
    });

    it('rejects invalid email formats', () => {
      const result = contactFormSchema.safeParse({ ...validFormData, email: 'not-an-email' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('valid business email');
      }
    });

    it('rejects invalid phone numbers or those under 10 digits', () => {
      const result = contactFormSchema.safeParse({ ...validFormData, phone: '123' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 10 digits');
      }
    });

    it('rejects messages shorter than 10 characters', () => {
      const result = contactFormSchema.safeParse({ ...validFormData, message: 'Too short' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('at least 10 characters');
      }
    });

    it('strictly rejects unexpected fields to prevent payload injection', () => {
      const maliciousPayload = {
        ...validFormData,
        isAdmin: true,
        extraInjection: 'SELECT * FROM users;',
      };
      const result = contactFormSchema.safeParse(maliciousPayload);
      expect(result.success).toBe(false);
    });

    it('validates API schema requires turnstileToken', () => {
      const apiPayloadWithoutToken = { ...validFormData };
      const resWithoutToken = contactApiSchema.safeParse(apiPayloadWithoutToken);
      expect(resWithoutToken.success).toBe(false);

      const apiPayloadWithToken = { ...validFormData, turnstileToken: 'dev-turnstile-token-sample' };
      const resWithToken = contactApiSchema.safeParse(apiPayloadWithToken);
      expect(resWithToken.success).toBe(true);
    });
  });

  // ── B. Rate Limiting Tests ──
  describe('In-Memory Rate Limiter (src/lib/rateLimit.ts)', () => {
    beforeEach(() => {
      resetRateLimitStore();
    });

    it('allows up to 5 requests per minute for a single IP', () => {
      const ip = '192.168.1.100';
      for (let i = 1; i <= 5; i++) {
        const check = checkRateLimit(ip, 5, 60000);
        expect(check.allowed).toBe(true);
        expect(check.remaining).toBe(5 - i);
      }
    });

    it('blocks the 6th request within the same minute window (HTTP 429 threshold)', () => {
      const ip = '192.168.1.101';
      for (let i = 1; i <= 5; i++) {
        checkRateLimit(ip, 5, 60000);
      }
      const sixthCheck = checkRateLimit(ip, 5, 60000);
      expect(sixthCheck.allowed).toBe(false);
      expect(sixthCheck.remaining).toBe(0);
      expect(sixthCheck.resetSeconds).toBeGreaterThan(0);
    });

    it('maintains independent rate limits for different IP addresses', () => {
      const ipA = '10.0.0.1';
      const ipB = '10.0.0.2';

      for (let i = 1; i <= 5; i++) {
        checkRateLimit(ipA, 5, 60000);
      }

      // ipA is blocked
      expect(checkRateLimit(ipA, 5, 60000).allowed).toBe(false);

      // ipB is still allowed
      expect(checkRateLimit(ipB, 5, 60000).allowed).toBe(true);
    });

    it('resets rate limit counter after the window expires', () => {
      const ip = '192.168.1.200';
      // Use 50ms window for testing
      for (let i = 1; i <= 5; i++) {
        checkRateLimit(ip, 5, 50);
      }
      expect(checkRateLimit(ip, 5, 50).allowed).toBe(false);

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          const checkAfter = checkRateLimit(ip, 5, 50);
          expect(checkAfter.allowed).toBe(true);
          expect(checkAfter.remaining).toBe(4);
          resolve();
        }, 70);
      });
    });
  });

  // ── C. Client IP Extraction Tests ──
  describe('IP Extraction (src/lib/rateLimit.ts)', () => {
    it('correctly extracts first IP from x-forwarded-for header', () => {
      const req = new Request('https://spanstudio.in/api/contact', {
        headers: { 'x-forwarded-for': '203.0.113.195, 70.41.3.18, 150.172.238.178' },
      });
      expect(getClientIp(req)).toBe('203.0.113.195');
    });

    it('extracts IP from x-real-ip when x-forwarded-for is missing', () => {
      const req = new Request('https://spanstudio.in/api/contact', {
        headers: { 'x-real-ip': '198.51.100.42' },
      });
      expect(getClientIp(req)).toBe('198.51.100.42');
    });

    it('falls back to 127.0.0.1 when no forwarding headers are provided', () => {
      const req = new Request('https://spanstudio.in/api/contact');
      expect(getClientIp(req)).toBe('127.0.0.1');
    });
  });

  // ── D. Database Schema Definition Tests ──
  describe('Drizzle Schema (src/lib/schema.ts)', () => {
    it('defines inquiries table with all required production columns', () => {
      expect(inquiries).toBeDefined();
      expect(inquiries.id).toBeDefined();
      expect(inquiries.name).toBeDefined();
      expect(inquiries.email).toBeDefined();
      expect(inquiries.phone).toBeDefined();
      expect(inquiries.company).toBeDefined();
      expect(inquiries.service).toBeDefined();
      expect(inquiries.message).toBeDefined();
      expect(inquiries.createdAt).toBeDefined();
    });
  });

  // ── E. Resend Email Helper Tests ──
  describe('Email Helper (src/lib/email.ts)', () => {
    it('handles missing RESEND_API_KEY gracefully without throwing', async () => {
      const originalKey = process.env.RESEND_API_KEY;
      delete process.env.RESEND_API_KEY;

      const result = await sendInquiryNotification({
        name: 'Test Name',
        email: 'test@example.com',
        phone: '+919876543210',
        company: 'Test Company',
        service: 'Factory / Industrial Videos',
        message: 'This is a test notification payload.',
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain('RESEND_API_KEY');

      if (originalKey) {
        process.env.RESEND_API_KEY = originalKey;
      }
    });
  });

  // ── F. POST /api/contact Route Handler Tests ──
  describe('API Route Handler (src/app/api/contact/route.ts)', () => {
    beforeEach(() => {
      resetRateLimitStore();
    });

    it('returns 400 when body is malformed JSON', async () => {
      const req = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        body: 'invalid-non-json-string',
        headers: { 'content-type': 'application/json' },
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.error).toContain('Malformed JSON');
    });

    it('returns 400 with structured fieldErrors when validation fails', async () => {
      const invalidData = {
        name: '',
        email: 'bad-email',
        phone: '123',
        company: '',
        service: '',
        message: 'short',
        turnstileToken: 'test-token',
      };

      const req = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(invalidData),
        headers: { 'content-type': 'application/json' },
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.fieldErrors).toBeDefined();
      expect(json.fieldErrors.name).toBeDefined();
      expect(json.fieldErrors.email).toBeDefined();
    });

    it('returns 400 when turnstileToken is missing from API request', async () => {
      const dataWithoutToken = {
        name: 'Test Name',
        email: 'test@example.com',
        phone: '+919876543210',
        company: 'Test Corp',
        service: 'Factory / Industrial Videos',
        message: 'Valid message describing the project scope in detail.',
      };

      const req = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(dataWithoutToken),
        headers: { 'content-type': 'application/json' },
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
      const json = await res.json();
      expect(json.success).toBe(false);
      expect(json.fieldErrors?.turnstileToken).toBeDefined();
    });

    it('returns 429 when rate limit of 5 requests per minute is exceeded', async () => {
      const validPayload = {
        name: 'Rapid Submitter',
        email: 'rapid@example.com',
        phone: '+919876543210',
        company: 'Rapid Ltd',
        service: 'Product Videos',
        message: 'Inquiry message that satisfies the 10 character minimum.',
        turnstileToken: 'dev-turnstile-token-test',
      };

      const testIp = '198.51.100.99';

      // Send 5 requests to hit rate limit
      for (let i = 0; i < 5; i++) {
        const req = new Request('http://localhost:3000/api/contact', {
          method: 'POST',
          body: JSON.stringify(validPayload),
          headers: {
            'content-type': 'application/json',
            'x-forwarded-for': testIp,
          },
        });
        await POST(req);
      }

      // 6th request must trigger HTTP 429
      const req6 = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validPayload),
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': testIp,
        },
      });

      const res6 = await POST(req6);
      expect(res6.status).toBe(429);
      expect(res6.headers.get('Retry-After')).toBeDefined();
      const json6 = await res6.json();
      expect(json6.success).toBe(false);
      expect(json6.error).toContain('Too many requests');
    });

    it('returns 200 when database insertion succeeds and triggers email notification', async () => {
      const dbModule = await import('../src/lib/db');

      const mockInquiryRecord = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Gaurav Joshi',
        email: 'gaurav@autocomponents.in',
        phone: '+91 99887 76655',
        company: 'Auto Components India',
        service: '3D Animation',
        message: 'Looking for internal CAD exploded animation of automotive transmission gears.',
        createdAt: new Date(),
      };

      const mockInsert = {
        values: () => ({
          returning: async () => [mockInquiryRecord],
        }),
      };

      const dbSpy = vi.spyOn(dbModule, 'getDb').mockReturnValue({
        insert: () => mockInsert,
      } as unknown as ReturnType<typeof dbModule.getDb>);

      const validPayload = {
        name: 'Gaurav Joshi',
        email: 'gaurav@autocomponents.in',
        phone: '+91 99887 76655',
        company: 'Auto Components India',
        service: '3D Animation',
        message: 'Looking for internal CAD exploded animation of automotive transmission gears.',
        turnstileToken: 'dev-turnstile-token-success',
      };

      const req = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validPayload),
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '198.51.100.123',
        },
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);
      expect(json.message).toContain('received');

      dbSpy.mockRestore();
    });

    it('returns 200 even if email notification fails (non-blocking best-effort email dispatch)', async () => {
      const dbModule = await import('../src/lib/db');
      const emailModule = await import('../src/lib/email');

      const mockInquiryRecord = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Anita Roy',
        email: 'anita@royplants.com',
        phone: '+91 91234 56789',
        company: 'Roy Plants',
        service: 'Photography',
        message: 'High resolution plant stills needed for upcoming industrial exhibition.',
        createdAt: new Date(),
      };

      const mockInsert = {
        values: () => ({
          returning: async () => [mockInquiryRecord],
        }),
      };

      const dbSpy = vi.spyOn(dbModule, 'getDb').mockReturnValue({
        insert: () => mockInsert,
      } as unknown as ReturnType<typeof dbModule.getDb>);

      const emailSpy = vi.spyOn(emailModule, 'sendInquiryNotification').mockResolvedValue({
        success: false,
        error: 'Simulated Resend API timeout',
      });

      const validPayload = {
        name: 'Anita Roy',
        email: 'anita@royplants.com',
        phone: '+91 91234 56789',
        company: 'Roy Plants',
        service: 'Photography',
        message: 'High resolution plant stills needed for upcoming industrial exhibition.',
        turnstileToken: 'dev-turnstile-token-resilience',
      };

      const req = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validPayload),
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': '198.51.100.124',
        },
      });

      const res = await POST(req);
      // Email failure MUST NOT fail the request or erase the saved inquiry
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.success).toBe(true);

      dbSpy.mockRestore();
      emailSpy.mockRestore();
    });
  });
});
