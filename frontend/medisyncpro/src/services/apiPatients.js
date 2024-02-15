import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getPatients({page, nameOrEmail}) {
    try {
        const response = await apiRequest('GET', 'patients', null, {
            page: page,
            nameOrEmail: nameOrEmail
        });
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function getPatientById(id) {
    try {
        const response = await apiRequest('GET', `patients/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}

export async function getPatientForProfile(id) {
    try {
        const response = await apiRequest('GET', `patients/profile`);
        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}


export async function createEditPatient(newPatient, id) {
    try {
        let response = {}
        if (id) {
            response = await apiRequest('PUT', `patients`, newPatient);

        } else {
            response = await apiRequest('POST', 'patients', newPatient);

        }
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function deletePatient(id) {
    try {
        const response = await apiRequest('DELETE', `patients/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}



export async function findByEmailOrContactNumber(emailOrPhoneNumber) {
    console.log("EMAIL",emailOrPhoneNumber);
    try {
        const response = await apiRequest('GET', `patients/findPatient/${emailOrPhoneNumber}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}