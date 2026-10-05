import { test, expect } from '@playwright/test';

test.describe('SPAN Assistant Deterministic Chatbot Critical Flows', () => {
  test('chatbot launcher appears, opens dialog, and closes with close button', async ({ page }) => {
    // Listen for all network requests to verify NO /api/chat or Gemini API calls occur
    const interceptedRequests: string[] = [];
    page.on('request', (request) => {
      interceptedRequests.push(request.url());
    });

    await page.goto('/');

    const launcher = page.locator('button[aria-label="Open SPAN Assistant chat"]');
    await expect(launcher).toBeVisible();

    await launcher.click();
    const chatDialog = page.locator('div[role="dialog"][aria-label="SPAN Assistant Chat"]');
    await expect(chatDialog).toBeVisible();

    // Verify close button
    const closeBtn = page.locator('button[aria-label="Close SPAN Assistant chat"]');
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(chatDialog).toBeHidden();

    // Assert zero AI or /api/chat network calls were made
    const aiCalls = interceptedRequests.filter(
      (url) => url.includes('/api/chat') || url.includes('generativelanguage.googleapis.com')
    );
    expect(aiCalls.length).toBe(0);
  });

  test('quick reply generates deterministic response without remote API call', async ({ page }) => {
    const interceptedRequests: string[] = [];
    page.on('request', (request) => {
      interceptedRequests.push(request.url());
    });

    await page.goto('/');

    const launcher = page.locator('button[aria-label="Open SPAN Assistant chat"]');
    await launcher.click();

    const quickReplyBtn = page.locator('button', { hasText: 'What services do you offer?' });
    await expect(quickReplyBtn).toBeVisible();
    await quickReplyBtn.click();

    // Verify deterministic assistant response appears
    const assistantReply = page.locator('text=five core visual production disciplines');
    await expect(assistantReply).toBeVisible();

    // Confirm no network request to /api/chat
    const chatApiRequests = interceptedRequests.filter((url) => url.includes('/api/chat'));
    expect(chatApiRequests.length).toBe(0);
  });

  test('handles Hinglish input deterministically with expected CTAs', async ({ page }) => {
    await page.goto('/');

    const launcher = page.locator('button[aria-label="Open SPAN Assistant chat"]');
    await launcher.click();

    const inputField = page.locator('#chat-user-input');
    await inputField.fill('Kitna charge karte ho?');
    await page.keyboard.press('Enter');

    // Verify pricing response
    const pricingText = page.locator('text=Project pricing is custom-quoted');
    await expect(pricingText).toBeVisible();

    // Verify CTA action buttons appear
    const whatsappAction = page.locator('a[href*="wa.me/917078382213"]');
    await expect(whatsappAction.first()).toBeVisible();
  });
});
