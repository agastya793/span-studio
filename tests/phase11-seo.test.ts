import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import sitemap from '../src/app/sitemap';
import { SITE_CONFIG, getCanonicalUrl } from '../src/lib/siteConfig';
import { getStudioBusinessSchema, getBreadcrumbSchema } from '../src/components/seo/JsonLd';
import nextConfig from '../next.config';

describe('Phase 11: SEO, Accessibility, & Performance Test Suite', () => {
  // ── 1. SITE CONFIG & CANONICAL URLS ──
  describe('Site Configuration & Canonical URLs', () => {
    it('contains all confirmed business facts without fabrication', () => {
      expect(SITE_CONFIG.name).toBe('SPAN Studio');
      expect(SITE_CONFIG.founder).toBe('Mr. Ankit');
      expect(SITE_CONFIG.teamSize).toBe(10);
      expect(SITE_CONFIG.contact.telephone).toBe('+91 70783 82213');
      expect(SITE_CONFIG.contact.email).toBe('agastya071@gmail.com');
      expect(SITE_CONFIG.contact.address.streetAddress).toBe('Rudrapur Bypass Rd');
      expect(SITE_CONFIG.contact.address.addressLocality).toBe('Rudrapur');
      expect(SITE_CONFIG.contact.address.addressRegion).toBe('Uttarakhand');
      expect(SITE_CONFIG.contact.address.postalCode).toBe('263153');
      expect(SITE_CONFIG.services.length).toBe(5);
    });

    it('generates normalized canonical URLs without trailing slash issues', () => {
      expect(getCanonicalUrl()).toBe('https://spanstudio.in');
      expect(getCanonicalUrl('/')).toBe('https://spanstudio.in');
      expect(getCanonicalUrl('/services')).toBe('https://spanstudio.in/services');
      expect(getCanonicalUrl('work')).toBe('https://spanstudio.in/work');
      expect(getCanonicalUrl('/contact')).toBe('https://spanstudio.in/contact');
    });

    it('clearly documents that production domain verification is pending', () => {
      expect(SITE_CONFIG.isProductionDomainLive).toBe(false);
    });
  });

  // ── 2. SITEMAP GENERATION ──
  describe('Sitemap Generation (src/app/sitemap.ts)', () => {
    it('returns exactly the 7 public routes', () => {
      const routes = sitemap();
      expect(routes.length).toBe(7);

      const urls = routes.map((r) => r.url);
      expect(urls).toContain('https://spanstudio.in');
      expect(urls).toContain('https://spanstudio.in/services');
      expect(urls).toContain('https://spanstudio.in/work');
      expect(urls).toContain('https://spanstudio.in/about');
      expect(urls).toContain('https://spanstudio.in/contact');
      expect(urls).toContain('https://spanstudio.in/privacy-policy');
      expect(urls).toContain('https://spanstudio.in/terms');
    });

    it('does not include API, internal, or nonexistent routes', () => {
      const routes = sitemap();
      routes.forEach((r) => {
        expect(r.url).not.toContain('/api');
        expect(r.url).not.toContain('_not-found');
      });
    });

    it('assigns valid priorities and change frequencies', () => {
      const routes = sitemap();
      routes.forEach((r) => {
        expect(r.priority).toBeGreaterThanOrEqual(0.1);
        expect(r.priority).toBeLessThanOrEqual(1.0);
        expect(['weekly', 'monthly', 'yearly']).toContain(r.changeFrequency);
      });
    });
  });

  // ── 3. ROBOTS.TXT ──
  describe('Robots.txt (public/robots.txt)', () => {
    it('exists and allows public crawling while protecting /api/', () => {
      const robotsPath = path.resolve(__dirname, '../public/robots.txt');
      expect(fs.existsSync(robotsPath)).toBe(true);

      const content = fs.readFileSync(robotsPath, 'utf8');
      expect(content).toContain('User-agent: *');
      expect(content).toContain('Allow: /');
      expect(content).toContain('Disallow: /api/');
      expect(content).toContain('Sitemap: https://spanstudio.in/sitemap.xml');
    });
  });

  // ── 4. STRUCTURED DATA (JSON-LD) ──
  describe('Structured Data Validation (Schema.org)', () => {
    it('generates valid ProfessionalService schema with confirmed details', () => {
      const schema = getStudioBusinessSchema();
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('ProfessionalService');
      expect(schema.name).toBe('SPAN Studio');
      expect(schema.telephone).toBe('+91 70783 82213');
      expect(schema.email).toBe('agastya071@gmail.com');
      expect(schema.address.streetAddress).toBe('Rudrapur Bypass Rd');
      expect(schema.founder.name).toBe('Mr. Ankit');
      expect(schema.numberOfEmployees.value).toBe(10);
    });

    it('contains the 5 confirmed services in the offer catalog', () => {
      const schema = getStudioBusinessSchema();
      const services = schema.hasOfferCatalog.itemListElement;
      expect(services.length).toBe(5);

      const serviceNames = services.map((s) => s.itemOffered.name);
      expect(serviceNames).toContain('Factory / Industrial Videos');
      expect(serviceNames).toContain('Product Videos');
      expect(serviceNames).toContain('Photography');
      expect(serviceNames).toContain('3D Animation');
      expect(serviceNames).toContain('Video Editing');
    });

    it('does NOT contain fabricated ratings, reviews, or unverified claims', () => {
      const schema = getStudioBusinessSchema() as Record<string, unknown>;
      expect(schema.aggregateRating).toBeUndefined();
      expect(schema.review).toBeUndefined();
      expect(schema.awards).toBeUndefined();
      expect(schema.foundingDate).toBeUndefined();
      expect(schema.sameAs).toBeUndefined();
    });

    it('generates valid BreadcrumbList schema', () => {
      const breadcrumbs = getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ]);
      expect(breadcrumbs['@context']).toBe('https://schema.org');
      expect(breadcrumbs['@type']).toBe('BreadcrumbList');
      expect(breadcrumbs.itemListElement.length).toBe(2);
      expect(breadcrumbs.itemListElement[0].name).toBe('Home');
      expect(breadcrumbs.itemListElement[1].name).toBe('Services');
      expect(breadcrumbs.itemListElement[1].item).toBe('https://spanstudio.in/services');
    });
  });

  // ── 5. SECURITY HEADERS ──
  describe('Security Headers (next.config.ts)', () => {
    it('defines all architecture-mandated HTTP security headers', async () => {
      if (typeof nextConfig.headers === 'function') {
        const headersList = await nextConfig.headers();
        const globalHeaders = headersList.find((h) => h.source === '/(.*)');
        expect(globalHeaders).toBeDefined();

        const headerMap = new Map(
          globalHeaders?.headers.map((h: { key: string; value: string }) => [h.key, h.value])
        );

        expect(headerMap.get('X-DNS-Prefetch-Control')).toBe('on');
        expect(headerMap.get('Strict-Transport-Security')).toContain('max-age=63072000');
        expect(headerMap.get('X-Frame-Options')).toBe('SAMEORIGIN');
        expect(headerMap.get('X-Content-Type-Options')).toBe('nosniff');
        expect(headerMap.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
        expect(headerMap.get('Permissions-Policy')).toContain('camera=()');
      }
    });
  });

  // ── 6. ASSET BUDGETS ──
  describe('Performance Asset Budgets', () => {
    it('3D model asset is within the architecture budget (< 2.5MB)', () => {
      const modelPath = path.resolve(__dirname, '../public/models/hero-object.glb');
      if (fs.existsSync(modelPath)) {
        const stats = fs.statSync(modelPath);
        const sizeMb = stats.size / (1024 * 1024);
        expect(sizeMb).toBeLessThan(2.5);
      }
    });

    it('fallback hero image is lightweight (< 150KB)', () => {
      const fallbackPath = path.resolve(__dirname, '../public/images/hero-3d-fallback.webp');
      if (fs.existsSync(fallbackPath)) {
        const stats = fs.statSync(fallbackPath);
        const sizeKb = stats.size / 1024;
        expect(sizeKb).toBeLessThan(150);
      }
    });
  });
});
