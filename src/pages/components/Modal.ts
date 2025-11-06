import { Locator } from '@playwright/test';

export interface ModalProps<T = unknown> { root: Locator; title?: Locator; data?: T }

/**
 * Componente de Modal genérico y tipado
 */
export class Modal<T = unknown> {
  constructor(private props: ModalProps<T>) {}

  async isOpen(): Promise<boolean> {
    return await this.props.root.isVisible();
  }

  async close(): Promise<void> {
    const closeBtn = this.props.root.getByRole('button', { name: /close/i });
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    }
  }
}