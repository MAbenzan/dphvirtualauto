import { Locator, Page } from '@playwright/test';
import { nowIso } from '@utils/dates';
import fs from 'fs';
import path from 'path';

export type ActionOptions = {
  timeout?: number;
  retries?: number;
  waitFor?: 'load' | 'domcontentloaded' | 'networkidle';
  preCheck?: () => Promise<void> | void;
  postCheck?: () => Promise<void> | void;
};

/**
 * Acciones reutilizables con esperas inteligentes, reintentos y validaciones.
 */
export class Actions {
  constructor(private page: Page, private defaults: ActionOptions = { timeout: 10000, retries: 3, waitFor: 'domcontentloaded' }) {
    if (this.defaults.timeout) this.page.setDefaultTimeout(this.defaults.timeout);
  }

  private mergeOptions(opts?: ActionOptions): ActionOptions {
    return {
      timeout: opts?.timeout ?? this.defaults.timeout,
      retries: opts?.retries ?? this.defaults.retries,
      waitFor: opts?.waitFor ?? this.defaults.waitFor,
      preCheck: opts?.preCheck ?? this.defaults.preCheck,
      postCheck: opts?.postCheck ?? this.defaults.postCheck,
    };
  }

  private async waitReady(waitFor: ActionOptions['waitFor'] = 'domcontentloaded') {
    await this.page.waitForLoadState(waitFor || 'domcontentloaded');
  }

  private async captureOnFailure(name: string) {
    const dir = path.resolve('artifacts', 'screenshots');
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `${name}-${nowIso()}.png`);
    await this.page.screenshot({ path: file, fullPage: true });
    return file;
  }

  private async withRetry(fn: () => Promise<void>, opts?: ActionOptions) {
    const options = this.mergeOptions(opts);
    const retries = options.retries ?? 3;
    let lastError: unknown = undefined;
    for (let i = 0; i < retries; i++) {
      try {
        await fn();
        return;
      } catch (e) {
        lastError = e;
        if (i < retries - 1) await this.page.waitForTimeout(500);
      }
    }
    throw lastError;
  }

  async click(target: Locator, opts?: ActionOptions): Promise<void> {
    const options = this.mergeOptions(opts);
    await this.withRetry(async () => {
      if (options.preCheck) await options.preCheck();
      await target.waitFor({ state: 'visible', timeout: options.timeout });
      await this.waitReady(options.waitFor);
      try {
        await target.click({ timeout: options.timeout });
      } catch (e) {
        const file = await this.captureOnFailure('click');
        throw new Error(`Fallo en click. Screenshot: ${file}. Detalle: ${(e as Error).message}`);
      }
      if (options.postCheck) await options.postCheck();
    }, options);
  }

  async type(target: Locator, text: string, opts?: ActionOptions): Promise<void> {
    const options = this.mergeOptions(opts);
    await this.withRetry(async () => {
      if (options.preCheck) await options.preCheck();
      await target.waitFor({ state: 'visible', timeout: options.timeout });
      await this.waitReady(options.waitFor);
      try {
        await target.fill(text, { timeout: options.timeout });
      } catch (e) {
        const file = await this.captureOnFailure('type');
        throw new Error(`Fallo en type. Screenshot: ${file}. Detalle: ${(e as Error).message}`);
      }
      if (options.postCheck) await options.postCheck();
    }, options);
  }

  async hover(target: Locator, opts?: ActionOptions): Promise<void> {
    const options = this.mergeOptions(opts);
    await this.withRetry(async () => {
      if (options.preCheck) await options.preCheck();
      await target.waitFor({ state: 'visible', timeout: options.timeout });
      await this.waitReady(options.waitFor);
      try {
        await target.hover({ timeout: options.timeout });
      } catch (e) {
        const file = await this.captureOnFailure('hover');
        throw new Error(`Fallo en hover. Screenshot: ${file}. Detalle: ${(e as Error).message}`);
      }
      if (options.postCheck) await options.postCheck();
    }, options);
  }

  async press(target: Locator, key: string, opts?: ActionOptions): Promise<void> {
      await this.withRetry(async () => {
          if (opts?.preCheck) await opts.preCheck();
          await target.waitFor({ state: 'visible', timeout: opts?.timeout ?? 10000 });
          await target.focus();
          await this.waitReady(opts?.waitFor);
          try {
              await target.press(key, { timeout: opts?.timeout ?? 10000 });
          } catch (e) {
              const file = await this.captureOnFailure('press');
              throw new Error(`Fallo en press(${key}). Screenshot: ${file}. Detalle: ${(e as Error).message}`);
          }
          if (opts?.postCheck) await opts.postCheck();
      }, opts);
  }
  
  async enter(target: Locator, opts?: ActionOptions): Promise<void> {
      return this.press(target, 'Enter', opts);
  }
}