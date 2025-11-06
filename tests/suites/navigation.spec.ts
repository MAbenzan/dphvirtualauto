import { test, expect } from '@playwright/test';
import { performLogin } from '@actions/Login';
import { Actions } from '@actions/CustomActions';
import { MenuLocators } from '@selectors/menu';

test('mi caso con login reutilizable y menú', async ({ page }) => {
  await performLogin(page); 
  const actions = new Actions(page);
  const menu = new MenuLocators(page);

  await actions.click(menu.comboboxCliente);
  await actions.type(menu.searchcombobox, 'plaza lama');
  await actions.enter(menu.searchcombobox); 

});
