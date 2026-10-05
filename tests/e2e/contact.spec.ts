import { test, expect } from '@playwright/test';

test.describe('SPAN Studio Contact Form Critical Flows', () => {
  test.beforeEach(async ({ page }) => {
    // Mock Cloudflare Turnstile to run deterministically without external network dependency
    await page.addInitScript(() => {
      (window as unknown as { turnstile: unknown }).turnstile = {
        render: (_container: HTMLElement, options: { callback?: (token: string) => void }) => {
          setTimeout(() => {
            options.callback?.('mock-turnstile-token-e2e');
          }, 50);
          return 'mock-turnstile-widget-id';
        },
        reset: () => {},
        remove: () => {},
      };
    });

    // Intercept /api/contact to prevent real network dispatch or database writes during testing
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Inquiry received successfully (Mocked E2E)',
          id: 'test-inquiry-mock',
        }),
      });
    });

    await page.goto('/contact');
  });

  test('submitting empty form triggers validation error alerts', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.click();

    // Check that field error messages appear
    const errors = page.locator('p[role="alert"]');
    await expect(errors.first()).toBeVisible();

    // Specific field validations defined in schema
    await expect(page.locator('text=Full name must be at least 2 characters.').first()).toBeVisible();
    await expect(page.locator('text=Please enter a valid business email address.').first()).toBeVisible();
    await expect(page.locator('text=Company name must be at least 2 characters.').first()).toBeVisible();
    await expect(page.locator('text=Please provide at least 10 characters describing your project.').first()).toBeVisible();
  });

  test('invalid email entry displays validation error', async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    await nameInput.fill('Test User');

    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill('invalid-email-string');
    await emailInput.blur();

    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.click();

    const emailError = page.locator('text=Please enter a valid business email address.');
    await expect(emailError.first()).toBeVisible();
  });
});
