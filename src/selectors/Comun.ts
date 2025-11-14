import { Page, Locator } from '@playwright/test';

export class ComunLocators {
    constructor(private page: Page) {}

    get btnNueva(): Locator {return this.page.getByRole('button', { name: '+ Nueva' });}
    get btnCancelar(): Locator {return this.page.getByRole('button', { name: ' Cancelar' });}
    get btnProximo(): Locator {return this.page.getByRole('button', { name: 'Próximo ' });}
    get btnPrevio(): Locator {return this.page.getByRole('button', { name: ' Previo' });}  
    get btnSi(): Locator {return this.page.getByRole('button', { name: 'Si' });}
    get btnNo(): Locator {return this.page.getByRole('button', { name: 'No' });}
    get btnImprimir(): Locator {return this.page.getByRole('button', { name: 'Imprimir' });}
    get btnCerrar(): Locator {return this.page.getByRole('button', { name: 'Cerrar' });}
    get btnFinalizar(): Locator {return this.page.getByRole('button', { name: 'Finalizar ' });}

}