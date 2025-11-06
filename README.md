# DPHVirtualAuto

Proyecto de automatización web con Playwright y TypeScript.

## Arquitectura

- Acciones personalizadas con esperas y reintentos.
- Modelo de objetos de página (POM) con componentes reutilizables.
- Estrategia de localización priorizando role, text y placeholder.
- Marco de pruebas con hooks, reporter HTML y Allure.
- Gestión de entornos mediante dotenv (`.env.dev`, `.env.qa`, `.env.prod`).
- CI/CD con GitHub Actions y notificaciones a Slack.

## Scripts

- `npm test`: Ejecuta pruebas.
- `npm run test:ui`: Ejecuta pruebas con UI.
- `npm run report:open`: Abre el reporte HTML.
- `npm run allure:generate`: Genera reporte Allure.
- `npm run allure:open`: Abre Allure localmente.

## Entornos

Definir variables en `.env.<env>` y establecer `ENV=dev|qa|prod`.

## JSDoc

Todas las clases y métodos incluyen comentarios para facilitar el mantenimiento.