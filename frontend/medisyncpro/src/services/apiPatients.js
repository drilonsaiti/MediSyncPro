import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getPatients({page,nameOrEmail}) {
    try {
        const response = await apiRequest('GET', 'patients',null,{
            page:page,
            nameOrEmail: nameOrEmail
        });
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Patients could not be loaded');

    }
}

export async function getPatientById(id) {
    try {
        const response = await apiRequest('GET', `patients/${id}`);
        console.log("=====PATIENT=====");
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error('Patient could not be loaded');
    }
}


export async function createEditPatient(newPatient, id) {
    console.log(newPatient)
    try {
        let response = {}
        if (id) {
            response = await apiRequest('PUT', `patients`, newPatient);

        } else {
            response = await apiRequest('POST', 'patients', newPatient);

        }
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Patient could not be updated/created');

    }
}

export async function deletePatient(id) {
    try {
        const response = await apiRequest('DELETE', `patients/${id}`);
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Patient could not be deleted');

    }
}