module.exports = {
  // Perfil por defecto que ejecuta todas las pruebas
  default: `--import ./tests/ApiLogsTests/step_definitions/*.mjs --import ./tests/ApiUsersTests/step_definitions/*.mjs --import ./tests/IntegrationTests/step_definitions/*.mjs --format html:./reports/cucumber-report.html --format junit:./reports/junit_report.xml --format progress ./tests/**/*.feature`,

  // Perfil para ejecutar solo las pruebas de logs
  logs: `--import ./tests/ApiLogsTests/step_definitions/*.mjs --format html:./reports/logs-report.html --format junit:./reports/logs-junit_report.xml --format progress ./tests/ApiLogsTests/features/*.feature`,

  // Perfil para ejecutar solo las pruebas de users
  users: `--import ./tests/ApiUsersTests/step_definitions/*.mjs --format html:./reports/users-report.html --format junit:./reports/users-junit_report.xml --format progress ./tests/ApiUsersTests/features/*.feature`,

  // Perfil para ejecutar solo las pruebas de integration
  integration: `--import ./tests/IntegrationTests/step_definitions/*.mjs --format html:./reports/integration-report.html --format junit:./reports/integration-junit_report.xml --format progress ./tests/IntegrationTests/features/*.feature`,
};


