Feature: Obtener logs con paginación

    Scenario: Obtener los logs registrados ordenados
        Given existen logs registrados en el sistema
        When hago una solicitud GET a "/logs"
        Then la respuesta debería tener un código de estado 200
        And los logs deberían estar ordenados por fecha de creación descendente
        And la respuesta debería incluir un máximo de 10 logs

    Scenario: Obtener una página de logs
        Given existen más de 10 logs registrados en el sistema
        When hago una solicitud GET a "/logs?page=2&pageSize=10"
        Then la respuesta debería tener un código de estado 200
        And la respuesta debería incluir la página numero "2" de logs
