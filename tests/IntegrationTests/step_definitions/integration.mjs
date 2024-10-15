import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import axios from 'axios';

import { faker } from '@faker-js/faker';

let logs = [];
let response = null;

Given('Tengo los datos correspondientes al username, email y password del nuevo usuario', function () {
    this.userData = {
        "username": faker.internet.userName(),
        "password": "StrongPassword123!",
        "email": faker.internet.email()
    };
});

When('hago una solicitud POST a {string} con estos datos', async function (endpoint) {
    try {
        response = await axios.post(`http://localhost:8000${endpoint}`, this.userData);
    } catch (error) {
        response = error.response;
    }
});

Then('la respuesta debería tener un código de estado {int}', function (statusCode) {
    expect(response.status).to.equal(statusCode);
});

Then('debería haberse registrado un log con tipo {string}', async function (logType) {
    const logsResponse = await axios.get('http://localhost:5000/logs');
    const logs = logsResponse.data;
    const logExists = logs.some(log => log.logType === logType);
    expect(logExists).to.be.true;
});

When('hago una solicitud POST a {string} con estos datos y el email {string}', async function (endpoint, email) {
    try {
        this.userData.email = email;
        response = await axios.post(`http://localhost:8000${endpoint}`, this.userData);
    } catch (error) {
        response = error.response;
    }
});

Given('No existe un usuario registrado con el correo {string}', function (email) {
    this.nonExistingEmail = email;
});

When('hago una solicitud POST a {string} con el correo {string}', async function (endpoint, email) {
    try {
        response = await axios.post(`http://localhost:8000${endpoint}`, { email: email });
    } catch (error) {
        response = error.response;
    }
});

Given('Existe un usuario registrado con un username {string}', async function (username) {
    try {
        await axios.post('http://localhost:8000/users', {
            username: username,
            email: `${username}@example.com`,
            password: 'Newpassword321!'
        });
    } catch (error) {
        // Si ocurre un error 409, lo ignoramos y continuamos con la prueba
        if (error.response && error.response.status !== 409) {
            throw error;
        }
    }
});


When('hago una solicitud PUT a {string} con los nuevos datos', async function (endpoint) {
    const updateData = {
        username: 'updateduser',
        email: 'updateduser@example.com'
    };

    try {
        response = await axios.put(`http://localhost:8000${endpoint}`, updateData);
    } catch (error) {
        response = error.response;
    }
});

Then('el log debería tener la descripción que incluya el email {string}', function (email) {
    const log = logs.find(log => log.description.includes(email));
    expect(log).to.not.be.undefined;
});
