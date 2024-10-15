Feature: Creación de logs

    Scenario: Registrar un log exitosamente
        Given tengo los datos de un nuevo log generado por la aplicación "App1" con tipo "error", clase "AuthService", resumen "Fallo en autenticación" y descripción "Error al autenticar usuario"
        When hago una solicitud POST a "/logs"
        Then la respuesta debería tener un código de estado 201
        And el log debería estar registrado correctamente en el sistema

    Scenario: Registrar un log con datos incompletos
        Given tengo los datos de un log generado por la aplicación "App1" sin el campo de tipo
        When hago una solicitud POST a "/logs"
        Then la respuesta debería tener un código de estado 400
        And no debería registrarse el log en el sistema
