import { Page, Locator } from '@playwright/test';

export class LoginLocators {
    constructor(private page: Page) {}

    get user(): Locator { return this.page.locator('#email'); }
    get password(): Locator { return this.page.locator('#password'); }
    get submit(): Locator { return this.page.getByRole('button', { name: 'Acceder' }); }

}