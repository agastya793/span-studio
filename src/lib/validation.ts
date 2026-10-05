import { z } from 'zod';

/**
 * Valid service options aligned with confirmed SPAN Studio service offerings.
 */
export const VALID_SERVICES = [
  'Factory / Industrial Videos',
  'Product Videos',
  'Photography',
  '3D Animation',
  'Video Editing',
  'Integrated Production Scope (Multiple)',
] as const;

/**
 * Shared Contact Form Validation Schema.
 * Used for both client-side validation and server-side verification.
 */
export const contactFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: 'Full name must be at least 2 characters.' })
      .max(100, { message: 'Name must not exceed 100 characters.' }),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email({ message: 'Please enter a valid business email address.' })
      .max(255, { message: 'Email address must not exceed 255 characters.' }),
    phone: z
      .string()
      .trim()
      .min(10, { message: 'Phone number must be at least 10 digits.' })
      .max(20, { message: 'Phone number must not exceed 20 digits.' })
      .regex(/^[0-9+\s\-()]+$/, {
        message: 'Phone number may only contain digits, spaces, hyphens, and + symbol.',
      }),
    company: z
      .string()
      .trim()
      .min(2, { message: 'Company name must be at least 2 characters.' })
      .max(100, { message: 'Company name must not exceed 100 characters.' }),
    service: z
      .string()
      .trim()
      .min(1, { message: 'Please select a primary production service.' })
      .max(100, { message: 'Service name must not exceed 100 characters.' }),
    message: z
      .string()
      .trim()
      .min(10, { message: 'Please provide at least 10 characters describing your project.' })
      .max(2000, { message: 'Project details must not exceed 2000 characters.' }),
  })
  .strict();

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Server API Validation Schema.
 * Enforces the contact form fields plus the required Turnstile verification token.
 * Strict mode prevents unwanted or malicious injection of unexpected fields.
 */
export const contactApiSchema = contactFormSchema
  .extend({
    turnstileToken: z
      .string()
      .trim()
      .min(1, { message: 'Bot protection verification token is required.' })
      .max(2048, { message: 'Invalid verification token.' }),
  })
  .strict();

export type ContactApiPayload = z.infer<typeof contactApiSchema>;
