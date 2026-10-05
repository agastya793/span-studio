import { test, expect } from '@playwright/test';

test.describe('SPAN Studio Navigation & Routing', () => {
  test('desktop navbar renders and contains brand logo and key links', async ({ page, isMobile }) => {
    await page.goto('/');

    const logo = page.locator('header a[aria-label="SPAN Studio Home"]');
    await expect(logo).toBeVisible();
    await expect(logo).toContainText('SPAN');

    if (!isMobile) {
      const desktopNav = page.locator('nav[aria-label="Primary Navigation"]');
      await expect(desktopNav).toBeVisible();

      const links = ['Work', 'Services', '3D', 'About'];
      for (const label of links) {
        await expect(desktopNav.locator(`text=${label}`).first()).toBeVisible();
      }
    }
  });

  test('mobile hamburger opens and closes navigation drawer', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile menu drawer test is mobile-only');

    await page.goto('/');
    const hamburger = page.locator('button[aria-label="Open navigation menu"]');
    await expect(hamburger).toBeVisible();

    await hamburger.click();
    const menuDrawer = page.locator('div[role="dialog"][aria-label="Navigation Menu"]');
    await expect(menuDrawer).toBeVisible();

    // Close button
    const closeBtn = menuDrawer.locator('button[aria-label="Close navigation menu"]');
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(menuDrawer).toBeHidden();
  });

  test('routes navigate successfully to all supporting pages', async ({ page }) => {
    const routes = [
      { path: '/services', titlePattern: /Production Services/ },
      { path: '/work', titlePattern: /Work & Visual Standards/ },
      { path: '/about', titlePattern: /About/ },
      { path: '/contact', titlePattern: /Contact & Project Inquiries/ },
      { path: '/privacy-policy', titlePattern: /Privacy Policy/ },
      { path: '/terms', titlePattern: /Terms/ },
    ];

    for (const route of routes) {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(route.titlePattern);
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
    }
  });
});
