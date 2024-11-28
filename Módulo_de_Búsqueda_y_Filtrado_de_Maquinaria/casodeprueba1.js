const { Builder, By, until } = require('selenium-webdriver');

(async function testBusquedaPorTipoMaquinariaGrande() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Paso 1: Navegar al sitio
        await driver.get('http://localhost:3000'); // Cambia por la URL base de tu aplicación

        // Paso 2: Abrir opciones de filtros
        let botonFiltro = await driver.wait(
            until.elementLocated(By.css(".filter-button")),
            5000
        );
        await botonFiltro.click();

        // Paso 3: Seleccionar tipo de máquina "Grande"
        let tipoMaquinaDropdown = await driver.findElement(By.id("tipo-maquina"));
        await tipoMaquinaDropdown.click(); // Abrir el menú desplegable

        let opcionGrande = await driver.findElement(By.css("option[value='grande']"));
        await opcionGrande.click(); // Seleccionar la opción "Grande"
        await delay(3000);
        // Paso 4: Aplicar filtros
        let botonAplicarFiltros = await driver.findElement(By.css(".apply-filters-button"));
        await botonAplicarFiltros.click();

        // Paso 5: Validar redirección
        // Espera a que la URL cambie después de aplicar el filtro
        await driver.wait(until.urlContains('http://localhost:3000/maquinariagrande?tipo-maquina=grande'), 5000);

        let currentUrl = await driver.getCurrentUrl(); // Obtener la URL actual
        if (currentUrl === 'http://localhost:3000/maquinariagrande?tipo-maquina=grande') {
            console.log("Prueba completada: Se redirigió correctamente a la URL esperada.");
        } else {
            console.error("Prueba fallida: La URL no coincide con la esperada.");
        }
    } catch (err) {
        console.error("Error durante la prueba:", err);
    } finally {
        await driver.quit();
    }
})();
