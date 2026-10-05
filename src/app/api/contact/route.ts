import { NextResponse } from 'next/server';
import { contactApiSchema } from '@/lib/validation';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { getDb } from '@/lib/db';
import { inquiries } from '@/lib/schema';
import { sendInquiryNotification } from '@/lib/email';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic';

/**
 * Validates a Turnstile token against Cloudflare's siteverify endpoint.
 */
async function verifyTurnstileToken(
  token: string,
  ip: string
): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  const isProduction = process.env.NODE_ENV === 'production';

  if (!secretKey) {
    if (isProduction) {
      console.error('[Turnstile] TURNSTILE_SECRET_KEY is missing in production.');
      return { success: false, error: 'Bot protection service is unconfigured.' };
    }
    // In local development without secret key, allow dev fallback tokens
    if (token.startsWith('dev-turnstile-token') || token === '1x00000000000000000000AA') {
      return { success: true };
    }
    return { success: true };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    formData.append('remoteip', ip);

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });

    const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] };

    if (data.success) {
      return { success: true };
    }

    console.warn('[Turnstile] Verification failed:', data['error-codes']);
    return { success: false, error: 'Bot protection verification failed.' };
  } catch (err) {
    console.error('[Turnstile] Verification connection error:', err);
    if (!isProduction) {
      // Don't block local dev on network issues
      return { success: true };
    }
    return { success: false, error: 'Unable to verify bot protection service.' };
  }
}

/**
 * POST /api/contact
 * Handles project inquiry submissions.
 */
export async function POST(req: Request) {
  console.log('[INQUIRY_SUBMISSION] request received');
  const clientIp = getClientIp(req);

  // 1. Parse request body
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    console.warn('[INQUIRY_SUBMISSION] malformed JSON payload received');
    return NextResponse.json(
      { success: false, error: 'Malformed JSON payload.' },
      { status: 400 }
    );
  }

  // 2. Validate request body with shared Zod schema
  let validatedPayload;
  try {
    validatedPayload = contactApiSchema.parse(rawBody);
    console.log('[INQUIRY_SUBMISSION] payload validation passed');
  } catch (err) {
    if (err instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of err.issues) {
        const key = issue.path[0] ? String(issue.path[0]) : 'form';
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      console.warn('[INQUIRY_SUBMISSION] payload validation failed:', fieldErrors);
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed. Please correct the highlighted fields.',
          fieldErrors,
        },
        { status: 400 }
      );
    }

    console.warn('[INQUIRY_SUBMISSION] payload validation failed with unexpected error');
    return NextResponse.json(
      { success: false, error: 'Invalid form submission data.' },
      { status: 400 }
    );
  }

  // 3. Validate Turnstile token
  const turnstileCheck = await verifyTurnstileToken(
    validatedPayload.turnstileToken,
    clientIp
  );

  if (!turnstileCheck.success) {
    console.warn('[INQUIRY_SUBMISSION] turnstile verification failed');
    return NextResponse.json(
      {
        success: false,
        error: turnstileCheck.error || 'Bot protection verification failed. Please try again.',
      },
      { status: 400 }
    );
  }

  // 4. Apply IP-based rate limiting (5 req / min / IP)
  const rateLimit = checkRateLimit(clientIp, 5, 60 * 1000);
  if (!rateLimit.allowed) {
    console.warn('[INQUIRY_SUBMISSION] rate limit exceeded for client IP:', clientIp);
    return NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please wait a minute before submitting another inquiry.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimit.resetSeconds),
          'X-RateLimit-Limit': String(rateLimit.limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateLimit.resetSeconds),
        },
      }
    );
  }

  // 5. Insert valid inquiry into PostgreSQL via Drizzle
  console.log('[INQUIRY_SUBMISSION] database insert started');
  let insertedInquiry;
  try {
    const db = getDb();
    const rows = await db
      .insert(inquiries)
      .values({
        name: validatedPayload.name,
        email: validatedPayload.email,
        phone: validatedPayload.phone,
        company: validatedPayload.company,
        service: validatedPayload.service,
        message: validatedPayload.message,
      })
      .returning();

    insertedInquiry = rows[0];
    console.log('[INQUIRY_SUBMISSION] database insert succeeded with ID:', insertedInquiry?.id);
  } catch (dbError: unknown) {
    const errorMsg = dbError instanceof Error ? dbError.message : 'Unknown database error';
    console.error(`[INQUIRY_SUBMISSION] database insert failed: ${errorMsg}`);

    return NextResponse.json(
      {
        success: false,
        error:
          'Unable to save your inquiry at this moment. Please reach out to us directly via WhatsApp or phone.',
      },
      { status: 500 }
    );
  }

  // 6. Trigger Resend email notification best-effort (non-blocking)
  sendInquiryNotification({
    id: insertedInquiry?.id,
    name: validatedPayload.name,
    email: validatedPayload.email,
    phone: validatedPayload.phone,
    company: validatedPayload.company,
    service: validatedPayload.service,
    message: validatedPayload.message,
    createdAt: insertedInquiry?.createdAt || new Date(),
  }).catch((emailErr) => {
    console.error('[Contact API] Best-effort email dispatch failed:', emailErr);
  });

  // 7. Return JSON success response
  console.log('[INQUIRY_SUBMISSION] returning success response to client');
  return NextResponse.json(
    {
      success: true,
      message:
        'Your project brief has been received. Our team will review your requirements and respond promptly.',
    },
    {
      status: 200,
      headers: {
        'X-RateLimit-Limit': String(rateLimit.limit),
        'X-RateLimit-Remaining': String(rateLimit.remaining),
        'X-RateLimit-Reset': String(rateLimit.resetSeconds),
      },
    }
  );
}
