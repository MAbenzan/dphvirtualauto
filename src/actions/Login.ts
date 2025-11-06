import { Page } from '@playwright/test';
import { LoginLocators } from '@selectors/login';

type LoginOptions = {
  username?: string;
  password?: string;
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
  timeout?: number;
};

/**
 * Realiza login y deja la sesión iniciada para el test.
 * Si no hay credenciales, simplemente no hace nada (login condicional).
 */
export async function performLogin(page: Page, opts?: LoginOptions): Promise<void> {
  const login = new LoginLocators(page);
  const username = opts?.username ?? process.env.AUTH_USERNAME;
  const password = opts?.password ?? process.env.AUTH_PASSWORD;

  if (!username || !password) return;

  await page.goto('/Account/Login', {
    waitUntil: opts?.waitUntil ?? 'domcontentloaded',
    timeout: opts?.timeout ?? 30_000,
  });

  await login.user.fill(username);
  await login.password.fill(password);
  await login.submit.click();

  // Opcional: espera hasta que cargue post-login.
  await page.waitForLoadState('networkidle');
}