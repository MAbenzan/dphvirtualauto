import { test as base } from '@playwright/test';
import { Actions } from '@actions/CustomActions';
import { MenuLocators } from '@selectors/menu';

type Fixtures = {
  actions: Actions;
  menu: MenuLocators;
};

export const test = base.extend<Fixtures>({
  actions: async ({ page }, use) => {
    // ... existing code ...
    await use(new Actions(page));
    // ... existing code ...
  },
  menu: async ({ page }, use) => {
    // ... existing code ...
    await use(new MenuLocators(page));
    // ... existing code ...
  },
});

export { expect } from '@playwright/test';