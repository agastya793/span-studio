/**
 * In-Memory IP-based Rate Limiter.
 * Enforces 5 requests per minute per IP for contact submissions.
 *
 * NOTE ON SERVERLESS ARCHITECTURE:
 * In serverless environments (e.g. Vercel / AWS Lambda), in-memory state is isolated
 * to individual lambda execution instances and reset on cold starts.
 * For single-instance or regional cold-start lifecycles, this provides immediate
 * denial-of-service and rapid-submission protection without introducing Redis.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Periodic memory purge of stale keys every 5 minutes
const PURGE_INTERVAL_MS = 5 * 60 * 1000;
let lastPurge = Date.now();

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

/**
 * Checks whether the given IP has exceeded its allotted request rate.
 * @param ip Client IP address
 * @param limit Max allowed requests within the window (default 5)
 * @param windowMs Time window in milliseconds (default 60000ms = 1 minute)
 */
export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): RateLimitResult {
  const now = Date.now();

  // Periodic purge of expired timestamps to avoid memory leaks
  if (now - lastPurge > PURGE_INTERVAL_MS) {
    lastPurge = now;
    for (const [key, record] of rateLimitStore.entries()) {
      if (record.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
  }

  const existing = rateLimitStore.get(ip);

  if (!existing || existing.resetAt <= now) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetAt: now + windowMs,
    };
    rateLimitStore.set(ip, newRecord);
    return {
      allowed: true,
      limit,
      remaining: limit - 1,
      resetSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (existing.count >= limit) {
    const resetSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetSeconds,
    };
  }

  existing.count += 1;
  const resetSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
  return {
    allowed: true,
    limit,
    remaining: limit - existing.count,
    resetSeconds,
  };
}

/**
 * Extracts client IP from request headers.
 */
export function getClientIp(req: Request): string {
  // 1. x-forwarded-for header (first IP in comma-separated list)
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map((ip) => ip.trim());
    if (ips[0]) {
      return ips[0];
    }
  }

  // 2. x-real-ip
  const realIp = req.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  // 3. cf-connecting-ip (Cloudflare edge)
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) {
    return cfIp.trim();
  }

  return '127.0.0.1';
}

/**
 * Helper to clear rate limit store (used in testing).
 */
export function resetRateLimitStore(): void {
  rateLimitStore.clear();
}
