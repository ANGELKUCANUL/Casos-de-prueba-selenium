const { Builder, By, until } = require('selenium-webdriver');

// Función de delay (opcional para observar el flujo)
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// Función para verificar campos vacíos
async function checkEmptyFields(driver, fieldIds) {
  for (const id of fieldIds) {
    const field = await driver.findElement(By.id(id));
    const value = await field.getAttribute('value');
    if (!value.trim()) {
      console.log(`El campo con ID '${id}' está vacío.`);
      return false; // Detenemos si hay un campo vacío
    }
  }
  return true; // Todos los campos están llenos
}

async function registrationTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Navegar a la página de inicio de sesión
    await driver.get('http://localhost:3000/Login');

    // Clic en "Regístrate aquí"
    const signupLink = await driver.wait(until.elementLocated(By.linkText('Regístrate aquí')), 5000);
    await signupLink.click();

    // Seleccionar el botón "Cliente" en la selección de rol
    const clientButton = await driver.wait(
      until.elementLocated(By.css('button.role-button:not(.admin)')),
      5000
    );
    await clientButton.click();

    // Completar formulario de registro
    await driver.findElement(By.id('name')).sendKeys('Usuario de Prueba');
    await driver.findElement(By.id('email-register')).sendKeys('prueba5@example.com');
    await driver.findElement(By.id('password-register')).sendKeys('');
    await driver.findElement(By.id('confirm-password')).sendKeys('');
    await driver.findElement(By.id('telefono')).sendKeys('1234567890');
    await driver.findElement(By.id('direccion')).sendKeys('Calle Falsa 123');
    await delay(2000); // Pausa opcional para observar el flujo

    // Validar si hay campos vacíos antes de continuar
    const fieldIds = [
      'name',
      'email-register',
      'password-register',
      'confirm-password',
      'telefono',
      'direccion'
    ];
    const allFieldsFilled = await checkEmptyFields(driver, fieldIds);
    if (!allFieldsFilled) {
      console.log("Prueba fallida: Faltan datos en el formulario.");
      return; // Salimos de la función si hay campos vacíos
    }
    await delay(3000);
    // Presionar el botón "Registrarse" por ID
    const registerButton = await driver.findElement(By.id('buttomregistrer'));
    await driver.executeScript('arguments[0].scrollIntoView(true);', registerButton);
    await driver.wait(until.elementIsVisible(registerButton), 5000);
    await registerButton.click();
    await delay(2000); // Pausa opcional para observar el flujo

    // Manejo de alerta
    let texto = '';
    try {
      await driver.wait(until.alertIsPresent(), 5000);
      const alert = await driver.switchTo().alert();
      texto = await alert.getText(); // Obtener texto de la alerta
      console.log("Texto de la alerta:", texto);
      await alert.accept(); // Cierra la alerta
      await delay(2000); // Delay para procesar la alerta
    } catch (e) {
      console.log("No se detectó ninguna alerta.");
    }

    // Validar redirección al formulario de inicio de sesión
    await driver.wait(until.urlContains('/Login'), 5000);
    if (texto === "Usuario agregado correctamente") {
      console.log("Prueba exitosa: Registro completado y redirigido al inicio de sesión.");
    } else {
      console.log("Prueba fallida. Mensaje de alerta: " + texto);
    }
  } catch (error) {
    console.error("Error durante la prueba de registro:", error);
  } finally {
    await driver.quit();
  }
}

registrationTest();
