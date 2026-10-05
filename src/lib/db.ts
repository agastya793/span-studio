/**
 * Server-only Database Client for SPAN Studio.
 * Connects to PostgreSQL using Drizzle ORM.
 * Supports both Neon HTTP (for Neon serverless cloud endpoints) and standard PostgreSQL (via pg Pool).
 */

if (typeof window !== 'undefined') {
  throw new Error('Database client cannot be imported into client components.');
}

import { neon } from '@neondatabase/serverless';
import { drizzle as drizzleNeon, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { Pool } from 'pg';
import { drizzle as drizzlePg, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

let dbInstance: NeonHttpDatabase<typeof schema> | NodePgDatabase<typeof schema> | null = null;
let pgPoolInstance: Pool | null = null;

/**
 * Returns a configured Drizzle ORM database instance.
 * Throws a descriptive error if DATABASE_URL is not set.
 */
export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not configured.');
  }

  if (!dbInstance) {
    // If the URL is a Neon cloud HTTP URL (contains neon.tech or neon.com), use Neon HTTP driver
    if (databaseUrl.includes('neon.tech') || databaseUrl.includes('neon.com')) {
      const sql = neon(databaseUrl);
      dbInstance = drizzleNeon(sql, { schema });
    } else {
      // Standard PostgreSQL connection (localhost, Docker, self-hosted, etc.)
      pgPoolInstance = new Pool({
        connectionString: databaseUrl,
      });
      dbInstance = drizzlePg(pgPoolInstance, { schema });
    }
  }

  return dbInstance;
}
