import { pgTable, varchar, text, timestamp, uuid, index } from 'drizzle-orm/pg-core';

/**
 * Production Inquiries Table Schema.
 * Stores project briefs and contact inquiries submitted through the website.
 */
export const inquiries = pgTable(
  'inquiries',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 30 }).notNull(),
    company: varchar('company', { length: 100 }).notNull(),
    service: varchar('service', { length: 100 }).notNull(),
    message: text('message').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index('inquiries_created_at_idx').on(table.createdAt),
    index('inquiries_email_idx').on(table.email),
  ]
);

export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
