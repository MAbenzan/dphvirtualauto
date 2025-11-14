import { test, expect } from '@playwright/test';
import { performLogin } from '@pages/Login';
import { Actions } from '@actions/CustomActions';
import * as Selectors from '@selectors';


test.setTimeout(90000);

test('mi caso con login reutilizable y menú', async ({ page }) => {
  await performLogin(page); 
  const actions = new Actions(page);
  const menu = new Selectors.MenuLocators(page);
  const comun = new Selectors.ComunLocators(page);
  const autorizacionSalida = new Selectors.AutorizacionSalidaLocators(page);

  await actions.click(menu.comboboxCliente);
  await actions.type(menu.searchcombobox, 'plaza lama');
  await actions.enter(menu.searchcombobox); 

  await actions.click(menu.linkSolicitudes);
  await actions.click(menu.linkAutorizacionSalida);
  await actions.click(comun.btnNueva);
  await actions.click(comun.btnProximo);
  
  await actions.type(autorizacionSalida.textBuscar, 'TLLU7930941');
  await actions.enter(autorizacionSalida.textBuscar); 
  await page.waitForLoadState('networkidle');

  await actions.click(autorizacionSalida.chkSelectAll);
  await expect(comun.btnProximo).toBeEnabled();
  await actions.click(comun.btnProximo);
  await actions.click(comun.btnFinalizar);
  
  if (await comun.btnSi.isVisible()) {
    await actions.click(comun.btnSi);
  }
  if (await comun.btnCerrar.isVisible()) {
    await actions.click(comun.btnCerrar);
  }

});
