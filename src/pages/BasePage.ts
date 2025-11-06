import { Page, Locator, expect } from '@playwright/test';

export interface NavigationOptions { waitUntil?: 'load' | 'domcontentloaded' | 'networkidle'; timeout?: number }

/**
 * Clase base para páginas con métodos comunes.
 */
export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string, options: NavigationOptions = { waitUntil: 'domcontentloaded', timeout: 30_000 }): Promise<void> {
    await this.page.goto(url, options);
    await this.waitForReady();
  }

  async waitForReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  locatorBy(opts: { role?: { role: Parameters<Page['getByRole']>[0]; name?: string }; text?: string; placeholder?: string; css?: string }): Locator {
    if (opts.role) {
      const l = this.page.getByRole(opts.role.role as any, opts.role.name ? { name: opts.role.name } : {});
      if (opts.text) return l.filter({ hasText: opts.text });
      return l;
    }
    if (opts.text) return this.page.getByText(opts.text);
    if (opts.placeholder) return this.page.getByPlaceholder(opts.placeholder);
    if (opts.css) return this.page.locator(opts.css);
    throw new Error('Selector inválido');
  }

  async assertVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }
}