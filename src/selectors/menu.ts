import { Page, Locator } from '@playwright/test';

export class MenuLocators {
    constructor(private page: Page) {}

    get comboboxCliente(): Locator {return this.page.locator('[role="combobox"][aria-haspopup="listbox"]');}
    get searchcombobox(): Locator {return this.page.getByRole('combobox', { name: 'Search' });}
}

