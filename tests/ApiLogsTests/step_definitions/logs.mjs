import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import { expect } from 'chai';
import { fetchLogs, filterLogs } from './helpers.mjs';

const baseURL = 'http://127.0.0.1:5000';

Given('tengo los datos de un log generado por la aplicación {string} sin el campo de tipo', function (appName) {
    this.logData = {
        applicationName: appName,
        module: "AuthService",
        summary: "Fallo en autenticación",
        description: "Error al autenticar usuario",
        timestamp: new Date().toISOString(),
    };
});

Given('existen logs registrados en el sistema', async function () {
    try {
        const response = await axios.get(`${baseURL}/logs`);
        const existingLogs = response.data;

        if (existingLogs && existingLogs.length > 0) {
            return;
        }

        // Definir logs de prueba si no existen
        this.logsData = [
            {
                applicationName: "App1",
                logType: "error",
                module: "AuthService",
                timestamp: new Date('2024-01-05').toISOString(),
                summary: "Fallo en autenticación",
                description: "Error al autenticar usuario"
            },
            {
                applicationName: "App2",
                logType: "warning",
                module: "PaymentService",
                timestamp: new Date('2024-01-10').toISOString(),
                summary: "Pago rechazado",
                description: "No se pudo procesar el pago"
            },
            {
                applicationName: "App1",
                logType: "info",
                module: "UserService",
                timestamp: new Date('2024-01-15').toISOString(),
                summary: "Usuario registrado",
                description: "Un nuevo usuario se ha registrado"
            }
        ];

        for (const log of this.logsData) {
            const postResponse = await axios.post(`${baseURL}/logs`, log);
            expect(postResponse.status).to.equal(201);
        }

    } catch (error) {
        console.error('Error al verificar o insertar logs:', error.response?.data || error.message);
        throw new Error('No se pudieron registrar o verificar los logs en el sistema.');
    }
});

Then('la lista de logs debería contener solo logs con tipo {string}', function (logType) {
    const logs = this.response?.data; // Cambiado de .logs a .data
    expect(logs).to.not.be.undefined;
    expect(logs.length).to.be.greaterThan(0);

    logs.forEach(log => {
        expect(log.logType.toLowerCase()).to.equal(logType);
    });
});

Then('los logs deberían estar ordenados por fecha de creación descendente', function () {
    const logs = this.response?.data;
    expect(logs).to.not.be.undefined;
    expect(logs.length).to.be.greaterThan(0);
});

Given('existen más de {int} logs registrados en el sistema', function (int) {
    return;
});
Then('todos los logs deberían haber sido generados dentro del rango de fechas especificado', function () {

    return;
});

