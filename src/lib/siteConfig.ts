/**
 * ═══════════════════════════════════════════════════════════════
 * SPAN Studio — Centralized Site & SEO Configuration
 * Phase 11: Production SEO, Metadata, & Structured Data Standards
 * ═══════════════════════════════════════════════════════════════
 *
 * NOTE ON PRODUCTION DOMAIN STATUS:
 * The primary architectural domain placeholder is https://spanstudio.in.
 * Domain purchase, DNS mapping, and SSL live verification are pending.
 * Environment variables (NEXT_PUBLIC_SITE_URL / SITE_URL) allow seamless
 * override during staging, preview deployments, or local development.
 */

export const SITE_CONFIG = {
  name: 'SPAN Studio',
  legalName: 'SPAN Studio',
  tagline: 'MAKE YOUR WORK IMPOSSIBLE TO IGNORE.',
  description:
    'Independent visual cinematography studio in Rudrapur, Uttarakhand. Factory walkthroughs, industrial process documentation, commercial product films, high-resolution photography, 3D CAD mechanism animation, and cinema video editing.',
  /**
   * Centralized site URL.
   * Priority: NEXT_PUBLIC_SITE_URL -> SITE_URL -> placeholder default.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    'https://spanstudio.in',
  /**
   * Domain status flag: clearly documents that live production domain verification is pending.
   */
  isProductionDomainLive: false,
  locale: 'en_IN',
  founder: 'Mr. Ankit',
  teamSize: 10,
  contact: {
    telephone: '+91 70783 82213',
    telephoneRaw: '+917078382213',
    whatsapp: '+91 70783 82213',
    whatsappRaw: '917078382213',
    email: 'agastya071@gmail.com',
    mapsUrl:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ||
      'https://www.google.com/maps/place/ARS+COMPUTER/@28.9886308,79.4183647,17z',
    address: {
      streetAddress: 'Rudrapur Bypass Rd',
      addressLocality: 'Rudrapur',
      addressRegion: 'Uttarakhand',
      postalCode: '263153',
      addressCountry: 'IN',
    },
  },
  services: [
    'Factory / Industrial Videos',
    'Product Videos',
    'Photography',
    '3D Animation',
    'Video Editing',
  ] as const,
  serviceAreas: [
    'Rudrapur',
    'Pantnagar',
    'SIDCUL',
    'Uttarakhand',
    'Delhi NCR',
    'India',
  ] as const,
};

/**
 * Returns a normalized canonical URL for any given application route.
 * Handles trailing slashes cleanly and ensures single-slash joining.
 */
export function getCanonicalUrl(path: string = ''): string {
  const base = SITE_CONFIG.url.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return cleanPath === '/' ? base : `${base}${cleanPath}`;
}
