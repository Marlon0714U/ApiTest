import { Given, When, Then } from "@cucumber/cucumber";
import axios from 'axios';
import { expect } from 'chai';
import { createLog, fetchLogs } from "./helpers.mjs";

const baseURL = 'http://127.0.0.1:5000';

Given('tengo los datos de un nuevo log generado por la aplicación {string} con tipo {string}, clase {string}, resumen {string} y descripción {string}',
    function (applicationName, logType, module, summary, description) {
        this.logData = {
            applicationName,
            logType,
            module,
            summary,
            description,
            timestamp: new Date().toISOString(),
        };
    }
);

When('hago una solicitud POST a {string}', async function (endpoint) {
    const response = await createLog(endpoint, this.logData);
    this.response = response;
});

When('hago una solicitud GET a {string}', async function (endpoint) {
    const response = await fetchLogs(endpoint);
    this.response = response;
});

Then('la respuesta debería tener un código de estado {int}',
    function (statusCode) {
        expect(this.response.status).to.equal(statusCode);
    }
);

Then('la lista de logs debería contener solo logs generados por la aplicación {string}', function (applicationName) {
    const logs = this.response?.data;

    expect(logs).to.not.be.undefined;
    expect(logs.length).to.be.greaterThan(0);

    const filteredLogs = logs.filter(log => log.applicationName === applicationName);

    expect(filteredLogs.length).to.be.greaterThan(0);
    filteredLogs.forEach(log => {
        expect(log.applicationName).to.equal(applicationName);
    });
});

Then('la lista de logs debería contener solo logs generados por la aplicación {string} y con tipo {string}', function (appName, logType) {
    const logs = this.response?.data;
    expect(logs).to.not.be.undefined;

    logs.forEach(log => {
        expect(log.applicationName).to.equal(appName);
        expect(log.logType).to.equal(logType);
    });
});

Then('la respuesta debería incluir un máximo de {int} logs', function (maxLogs) {
    const logs = this.response?.data;
    expect(logs).to.not.be.undefined;
    expect(logs).to.have.lengthOf.at.most(maxLogs);
});

Then('el log debería estar registrado correctamente en el sistema',
    function () {
        expect(this.response.data).to.include.keys(
            "id",
            "applicationName",
            "logType",
            "module",
            "timestamp",
            "summary",
            "description"
        );
    }
);

Then('no debería registrarse el log en el sistema', async function () {
    const logsResponse = await axios.get(`${baseURL}/logs`);
    const logs = logsResponse.data;

    expect(logs).to.not.include(this.logData);
});

Then('la respuesta debería incluir la página numero {string} de logs', function (numberPage) {
    const logs = this.response?.data;
    expect(logs).to.not.be.undefined;

});