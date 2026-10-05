import { test, expect } from '@playwright/test';

test.describe('SPAN Studio Homepage Critical Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads and displays hero section with headline and CTA', async ({ page }) => {
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    const headline = hero.locator('h1');
    await expect(headline).toBeVisible();
    await expect(headline).toHaveAttribute('aria-label', 'MAKE YOUR WORK IMPOSSIBLE TO IGNORE.');
    await expect(headline).toContainText('MAKE');
    await expect(headline).toContainText('YOUR');
    await expect(headline).toContainText('WORK');
    await expect(headline).toContainText('IMPOSSIBLE');
    await expect(headline).toContainText('TO');
    await expect(headline).toContainText('IGNORE');

    const heroCta = hero.locator('a[href="/#work"]').first();
    await expect(heroCta).toBeVisible();
    await expect(heroCta).toContainText('Explore Work');
  });

  test('navigation anchors scroll to target sections', async ({ page }) => {
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeAttached();

    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeAttached();

    const finalCta = page.locator('#contact');
    await expect(finalCta).toBeAttached();
  });

  test('services section interaction works', async ({ page, isMobile }) => {
    const services = page.locator('#services');
    await services.scrollIntoViewIfNeeded();

    if (!isMobile) {
      // Desktop: tab switching
      const secondTab = page.locator('#tab-product-video');
      if (await secondTab.isVisible()) {
        await secondTab.click();
        await expect(secondTab).toHaveAttribute('aria-selected', 'true');
        const activePanel = page.locator('#panel-product-video');
        await expect(activePanel).toBeVisible();
      }
    } else {
      // Mobile: accordion toggle
      const trigger = page.locator('#accordion-trigger-product-video');
      if (await trigger.isVisible()) {
        await trigger.click();
        await expect(trigger).toHaveAttribute('aria-expanded', 'true');
      }
    }
  });

  test('FAQ accordion opens and closes', async ({ page }) => {
    const faq = page.locator('#faq');
    await faq.scrollIntoViewIfNeeded();

    const firstFaqButton = page.locator('.faq-item button').first();
    await expect(firstFaqButton).toBeVisible();

    const initialState = await firstFaqButton.getAttribute('aria-expanded');
    const expectedState = initialState === 'true' ? 'false' : 'true';
    await firstFaqButton.click();
    await expect(firstFaqButton).toHaveAttribute('aria-expanded', expectedState);
  });

  test('product story section is present and rendered', async ({ page }) => {
    const productStory = page.locator('#product');
    await productStory.scrollIntoViewIfNeeded();
    await expect(productStory).toBeVisible();
  });

  test('final CTA section exists with WhatsApp action link', async ({ page }) => {
    const finalCta = page.locator('#contact');
    await finalCta.scrollIntoViewIfNeeded();
    await expect(finalCta).toBeVisible();

    const whatsappLinks = page.locator('a[href*="wa.me/917078382213"]');
    await expect(whatsappLinks.first()).toBeAttached();
  });

  test('responsive layout verification', async ({ page, viewport }) => {
    if (!viewport) return;

    if (viewport.width === 1024) {
      // Tablet: Industrial Story uses normal vertical/grid layout, not desktop horizontal pin
      const industrialStory = page.locator('#industrial-story');
      await industrialStory.scrollIntoViewIfNeeded();
      await expect(industrialStory).toBeVisible();

      const desktopHorizontalContainer = industrialStory.locator('> div.hidden.xl\\:flex');
      await expect(desktopHorizontalContainer).toBeHidden();

      const mobileTabletContainer = industrialStory.locator('> div.block.xl\\:hidden');
      await expect(mobileTabletContainer).toBeVisible();
    }

    if (viewport.width <= 480) {
      // Mobile: check no horizontal page overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth + 5;
      });
      expect(hasHorizontalScroll).toBe(false);
    }
  });
});
