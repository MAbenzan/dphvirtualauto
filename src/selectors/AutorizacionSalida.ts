import { Page, Locator } from '@playwright/test';

export class AutorizacionSalidaLocators {
    constructor(private page: Page) {}

    //menu
    get menuAutorizacionSalida(): Locator {return this.page.getByRole('link', { name: 'Autorización de Salida /' });}

    get textFecha(): Locator {return this.page.getByRole('textbox', { name: 'dd/mm/aaaa' });}
    get textBuscar(): Locator {return this.page.getByRole('textbox', { name: 'BL, Contenedor o Booking' });}
    get chkSelect(): Locator { return this.page.locator('input.select-box[name="select"][type="checkbox"]'); }
    get chkSelectAll(): Locator { return this.page.locator('input.select-box[name="select"][type="checkbox"][value="all"]'); }

}
