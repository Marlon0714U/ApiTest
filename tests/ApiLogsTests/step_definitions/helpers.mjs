import axios from 'axios';

// URL base de la API de Logs
const BASE_URL = 'http://127.0.0.1:5000';

export const createLog = async (endpoint, logData) => {
    try {
        const response = await axios.post(`${BASE_URL}${endpoint}`, logData);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const fetchLogs = async (endpoint) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const filterLogs = async (endpoint, filters) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, { params: filters });
        return response;
    } catch (error) {
        return error.response;
    }
};
