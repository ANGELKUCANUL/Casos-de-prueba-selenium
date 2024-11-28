const { Builder, By, until } = require('selenium-webdriver');

// Función para agregar delays
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(async function testBusquedaPorTipoMaquinariaGrande() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Paso 1: Navegar al sitio
        await driver.get('http://localhost:3000'); // Cambia por la URL base de tu aplicación
        console.log("Página cargada.");
        await delay(2000); // Delay de 2 segundos para observar la página inicial

        // Paso 2: Abrir opciones de filtros
        let botonFiltro = await driver.wait(
            until.elementLocated(By.css(".filter-button")),
            5000
        );
        console.log("Botón de filtros encontrado.");
        await botonFiltro.click();
        console.log("Menú de filtros desplegado.");
        await delay(2000); // Delay de 2 segundos para observar el menú desplegado

        // Paso 3: Ingresar el valor "12000" en el cuadro de texto
        let cuadroTextoPrecio = await driver.findElement(By.id("precio")); // Asegúrate de que el ID sea correcto
        await cuadroTextoPrecio.clear(); // Limpiar el campo si tiene algún valor por defecto
        await cuadroTextoPrecio.sendKeys("12000"); // Escribir "12000" en el campo
        console.log("Valor '12000' ingresado en el cuadro de texto.");
        await delay(2000); // Delay de 2 segundos para observar la entrada de texto

        // Paso 4: Aplicar filtros
        let botonAplicarFiltros = await driver.findElement(By.css(".apply-filters-button"));
        await botonAplicarFiltros.click();
        console.log("Botón de aplicar filtros clicado.");
        await delay(3000); // Delay de 3 segundos para observar la redirección

        // Paso 5: Validar redirección
        await driver.wait(until.urlContains('http://localhost:3000/Maquinariapequena?precio=12000'), 5000);
        let currentUrl = await driver.getCurrentUrl(); // Obtener la URL actual
        if (currentUrl === 'http://localhost:3000/Maquinariapequena?precio=12000') {
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
