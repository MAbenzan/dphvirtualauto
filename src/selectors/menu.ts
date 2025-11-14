import { Page, Locator } from '@playwright/test';

export class MenuLocators {
    constructor(private page: Page) {}

    //Menu cliente
    get comboboxCliente(): Locator {return this.page.locator('[role="combobox"][aria-haspopup="listbox"]');}
    get searchcombobox(): Locator {return this.page.getByRole('combobox', { name: 'Search' });}

    //Solicitudes
    get linkSolicitudes(): Locator {return this.page.getByRole('link', { name: ' Solicitudes ' });}   
    get linkAutorizacionSalida(): Locator {return this.page.getByRole('link', { name: 'Autorización de Salida /' });}
    get linkNumeroDeReferencia(): Locator {return this.page.getByRole('link', { name: 'Numero de Referencia', exact: true });}
    get linkNumeroDeReferenciaCargos(): Locator {return this.page.getByRole('link', { name: 'Numero de Referencia Cargos' });}
    get linkNúmeroDeReferenciaPrecinto(): Locator {return this.page.getByRole('link', { name: 'Número de Referencia Precinto' });}
    get linkReclamaciones(): Locator {return this.page.getByRole('link', { name: 'Reclamaciones' });}
    get linkReleaseDeExportacion(): Locator {return this.page.getByRole('link', { name: 'Release de Exportación' });}

}

