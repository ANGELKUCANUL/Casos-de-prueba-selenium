const { Builder, By, until } = require('selenium-webdriver');

// Función de delay para hacer que la prueba sea más lenta
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
async function loginTest() {
  // Configuración del driver para Chrome
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navega a la página de inicio de sesión
    await driver.get('http://localhost:3000/Login');
    // Espera que el campo de email esté presente y escribe el correo

    await driver.wait(until.elementLocated(By.id('email')), 10000);
    await driver.findElement(By.id('email')).sendKeys('canul0800@gmail.com');
    await delay(2000); // Delay de 2 segundos entre acciones
    // Espera que el campo de password esté presente y escribe la contraseña
    await driver.wait(until.elementLocated(By.id('password')), 10000);
    await driver.findElement(By.id('password')).sendKeys('JOse');
    await delay(2000); // Delay de 2 segundos entre acciones
    // Hace clic en el botón de inicio de sesión
    await driver.findElement(By.css('button[type="submit"]')).click();
    await delay(3000); // Delay de 3 segundos para esperar a la respuesta del click
    // Maneja la alerta emergente (si existe)
    try {
      await driver.wait(until.alertIsPresent(), 5000);
      let alert = await driver.switchTo().alert();
      console.log("Texto de la alerta:", await alert.getText());
      await alert.accept(); // Cierra la alerta
      await delay(2000); // Delay para procesar la alerta
    } catch (e) {
      console.log("No se detectó ninguna alerta.");
    }
    // Espera la redirección a la página correcta según el rol del usuario
    if(    await driver.wait(until.urlContains('/proovedor'), 10000)==null   ){
      console.log("Prueba exitosa: Redirigido a la página del administrador.");

    }
  } catch (error) {
    console.error('Error en la prueba de inicio de sesión:', error);
  } finally {
    // Cierra el navegador
    await driver.quit();
  }
}

loginTest();
