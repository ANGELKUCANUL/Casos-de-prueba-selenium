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

    // Test: Pagar con tarjeta guardada
    const cvvField = await driver.findElement(By.id('cvv'));
    await cvvField.sendKeys('321');
    const payButton = await driver.findElement(By.xpath("//button[text()='Pagar']"));
    await payButton.click();
    console.log("Validación: Pago con tarjeta guardada completado.");
    await delay(30000); // Pausa después del pago

    try {
      await driver.wait(until.alertIsPresent(), 5000);
      const alert = await driver.switchTo().alert();
      const texto = await alert.getText(); // Obtener texto de la alerta
      console.log("Texto de la alerta:", texto);
      await alert.accept(); // Cierra la alerta
      await delay(3000); // Delay largo para procesar la alerta
    } catch (e) {
      console.log("No se detectó ninguna alerta.");
    }

    await delay(3000); // Pausa después del pago

    // Test: Añadir nueva tarjeta
   if(texto= "Pago procesado con éxito.")
   {
        console.log("caso de prueba fallido  se realizo el pago con datos falsos ");
   }
   else
   {
        console.log("caso de prueba exitosos no se realizo el pago con datos falsos ");
   }

    // Validar redirección o mensaje de éxito (simulado)
    
  } catch (error) {
    console.error("Error durante la prueba de métodos de pago:", error);
  } finally {
    await driver.quit();
  }
}

paymentTest();
