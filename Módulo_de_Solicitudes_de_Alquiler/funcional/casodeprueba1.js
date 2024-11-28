const { Builder, By, until } = require('selenium-webdriver');

// Función de delay para observar la ejecución (opcional)
async function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function rentalRequestTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // 1. Navegar a la página de inicio
    await driver.get('http://localhost:3000/informacion'); // Ajusta a la URL real de tu aplicación
    console.log("Validación: Navegación a la página principal completada.");
    await delay(2000); // Pausa para cargar

  
    const locationField = await driver.findElement(By.id('location'));
    await locationField.sendKeys('Ciudad de México');
    console.log("Validación: Campo de ubicación llenado correctamente.");

    const durationDropdown = await driver.findElement(By.id('duration'));
    await durationDropdown.click();
    await driver.findElement(By.xpath("//option[@value='7']")).click(); // Seleccionar "1 semana"
    console.log("Validación: Duración seleccionada correctamente.");

    const confirmButton = await driver.findElement(By.xpath("//button[contains(text(),'Confirmar Renta')]"));
    await confirmButton.click();
    console.log("Validación: Botón de confirmar renta presionado.");
    await delay(2000); // Pausa para observar el mensaje de confirmación

    // 5. Verificar mensaje de confirmación
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    console.log("Texto del mensaje de confirmación:", alertText);

    // Validar contenido del mensaje
    if (alertText.includes('¡Renta confirmada!')) {
      console.log("Validación: La renta se confirmó exitosamente.");
      console.log("Caso de prueba exitoso")
    } else {
      console.log("Error: El mensaje de confirmación no es el esperado.");
    }


    await alert.accept(); // Cierra el mensaje de confirmación
  } catch (error) {
    console.error("Error durante la prueba de renta:", error);
  } finally {
    await driver.quit();
  }
}

// Ejecutar el caso de prueba
rentalRequestTest();
