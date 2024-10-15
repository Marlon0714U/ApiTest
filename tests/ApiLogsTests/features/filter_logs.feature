Feature: Filtrar logs

    Scenario: Filtrar logs por rango de fecha de generación
        Given existen logs registrados en el sistema
        When hago una solicitud GET a "/logs?startDate=2024-10-01&endDate=2024-10-31"
        Then la respuesta debería tener un código de estado 200
        And todos los logs deberían haber sido generados dentro del rango de fechas especificado

    Scenario: Filtrar logs por tipo de log
        Given existen logs registrados en el sistema
        When hago una solicitud GET a "/logs?logType=Error"
        Then la respuesta debería tener un código de estado 200
        And la lista de logs debería contener solo logs con tipo "error"

    Scenario: Filtrar logs por aplicación que los genera
        Given existen logs registrados en el sistema
        When hago una solicitud GET a "/logs?application=App1"
        Then la respuesta debería tener un código de estado 200
        And la lista de logs debería contener solo logs generados por la aplicación "App1"

    Scenario: Filtrar logs por rango de fechas y tipo de log
        Given existen logs registrados en el sistema
        When hago una solicitud GET a "/logs?startDate=2024-10-01&endDate=2024-10-31&logType=error"
        Then la respuesta debería tener un código de estado 200
        And la lista de logs debería contener solo logs con tipo "error"
        And todos los logs deberían haber sido generados dentro del rango de fechas especificado

    Scenario: Filtrar logs por aplicación y tipo de log
        Given existen logs registrados en el sistema
        When hago una solicitud GET a "/logs?application=App1&logType=error"
        Then la respuesta debería tener un código de estado 200
        And la lista de logs debería contener solo logs generados por la aplicación "App1" y con tipo "error"
