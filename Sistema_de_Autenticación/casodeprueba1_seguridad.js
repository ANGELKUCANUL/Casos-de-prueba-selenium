const { Builder, By, until } = require('selenium-webdriver');

async function loginTest() {
  // Configuración del driver para Chrome
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navega a la página de inicio de sesión
    await driver.get('http://localhost:3000/Login');

    for (let attempt = 1; attempt <= 6; attempt++) {
      console.log(`Intento número: ${attempt}`);
      try {
        // Espera que el campo de email esté presente y escribe el correo
        await driver.wait(until.elementLocated(By.id('email')), 10000);
        await driver.findElement(By.id('email')).clear();
        await driver.findElement(By.id('email')).sendKeys('canul0800@gmail.com');

        // Espera que el campo de password esté presente y escribe la contraseña
        await driver.wait(until.elementLocated(By.id('password')), 10000);
        await driver.findElement(By.id('password')).clear();
        await driver.findElement(By.id('password')).sendKeys('JOse');

        // Hace clic en el botón de inicio de sesión
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Maneja la alerta emergente (si existe)
        try {
          await driver.wait(until.alertIsPresent(), 5000);
          let alert = await driver.switchTo().alert();
          console.log("Texto de la alerta:", await alert.getText());
          await alert.accept(); // Cierra la alerta
        } catch (e) {
          console.log("No se detectó ninguna alerta.");
        }

        // Verifica si redirige a la página correcta
        const urlCorrecta = await driver.wait(until.urlContains('/proovedor'), 10000).catch(() => false);
        if (urlCorrecta) {
          console.log("Prueba exitosa: Redirigido a la página del administrador.");
          break; // Sale del ciclo si el intento es exitoso
        } else {
          console.log("Intento fallido: No se redirigió a la página esperada.");
        }
      } catch (error) {
        console.error(`Error durante el intento ${attempt}:`, error);
      }

      if (attempt === 6) {
        console.log("Se excedieron los intentos de inicio de sesión. Caso de prueba fallido.");
      }
    }
  } finally {
    // Cierra el navegador al final
    await driver.quit();
  }
}

loginTest();
