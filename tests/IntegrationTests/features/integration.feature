Feature: Integración del sistema de usuarios con el sistema de logs

    Scenario: Crear un usuario exitosamente y verificar que se registre un log
        Given Tengo los datos correspondientes al username, email y password del nuevo usuario
        When hago una solicitud POST a "/users" con estos datos
        Then la respuesta debería tener un código de estado 201
        And debería haberse registrado un log con tipo "INFO"

    Scenario: Recuperar la contraseña de un usuario inexistente y registrar un log
        Given No existe un usuario registrado con el correo "noexiste@example.com"
        When hago una solicitud POST a "/password" con el correo "noexiste@example.com"
        Then la respuesta debería tener un código de estado 500
        And debería haberse registrado un log con tipo "WARNING"
