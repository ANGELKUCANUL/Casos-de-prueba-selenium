const { Builder, By, until } = require('selenium-webdriver');

// Función de delay para observar las pruebas (opcional)
async function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function paymentTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navegar a la página de Métodos de Pago
    await driver.get('http://localhost:3000/pago');
    await delay(2000); // Pausa para cargar la página

    // Test: Pagar con Oxxo
    const oxxoButton = await driver.findElement(By.xpath("//button[contains(text(),'Pagar con Oxxo')]"));
    await oxxoButton.click();
    await delay(2000); // Pausa más larga para observar el cambio de interfaz

    // Verificar que el texto del método de pago con Oxxo es visible
    const oxxoSection = await driver.findElement(By.id('oxxo'));
    const isOxxoVisible = await oxxoSection.isDisplayed();
    console.log("Validación: Se mostró correctamente la sección de pago con Oxxo:", isOxxoVisible);

    // Regresar desde el método de Oxxo
    const backButtonOxxo = await driver.findElement(By.css("#oxxo .back-button"));
    await backButtonOxxo.click();
    await delay(2000); // Pausa después de regresar

    // Test: Pagar con Tarjeta
    const cardButton = await driver.findElement(By.xpath("//button[contains(text(),'Pagar con Tarjeta')]"));
    await cardButton.click();
    await delay(2000); // Pausa para ver la transición

    // Verificar que el formulario de pago con tarjeta está visible
    const cardSection = await driver.findElement(By.id('card-payment'));
    const isCardVisible = await cardSection.isDisplayed();
    console.log("Validación: Se mostró correctamente la sección de pago con tarjeta:", isCardVisible);

    // Test: Iniciar el pago con tarjeta guardada, pero no completarlo
    const cvvField = await driver.findElement(By.id('cvv'));
    await cvvField.sendKeys('123');
    const payButton = await driver.findElement(By.xpath("//button[text()='Pagar']"));
    
    // Antes de hacer clic en "Pagar", cancelamos el pago
    const cancelButton = await driver.findElement(By.xpath("//button[text()='Cancelar']"));
    await cancelButton.click();
    console.log("Validación: Transacción cancelada antes de la confirmación.");

    // Verificar que el usuario ha regresado a la página anterior (Métodos de pago)
    const paymentPage = await driver.getCurrentUrl();
    console.log("Validación: El usuario regresó a la página de métodos de pago:", paymentPage.includes('pago'));

    // Comprobar si la URL contiene 'pago' para confirmar que el usuario regresó a la página de métodos de pago
    if(paymentPage.includes('pago')) {
        console.log("Caso de prueba exitoso: El programa permite cancelar antes de realizar el pago.");
    } else {
        console.log("Caso de prueba fallido.");
    }

    
  } catch (error) {
    console.error("Error durante la prueba de métodos de pago:", error);
  } finally {
    await driver.quit();
  }
}

paymentTest();
