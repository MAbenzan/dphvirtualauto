import { Locator, Page } from '@playwright/test';

export interface HeaderProps<T = unknown> { titleLocator: Locator; menuButtonLocator: Locator; data?: T }

/**
 * Componente de Header reutilizable
 */
export class Header<T = unknown> {
  constructor(private page: Page, private props: HeaderProps<T>) {}

  async openMenu(): Promise<void> {
    await this.props.menuButtonLocator.click();
  }

  async titleText(): Promise<string> {
    return (await this.props.titleLocator.textContent()) || '';
  }
}