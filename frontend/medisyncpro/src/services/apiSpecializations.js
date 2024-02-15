import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getSpecializations() {
    try {
        const response = await apiRequest('GET', 'specializations');
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function getSpecializationByClinicId() {
    try {
        const response = await apiRequest('GET', 'specializations/clinic');
        console.log("SPEC CL",response.data);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}


export async function addSpecializationToClinic(data) {

    try {
        const response = await apiRequest('POST', 'specializations/addSpecializationToClinic', data);

        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}


export async function createEditSpecializations(newSpecialization, id) {
    try {
        let response = {}
        if (id) {
            response = await apiRequest('PUT', `specializations`, newSpecialization);

        } else {
            response = await apiRequest('POST', 'specializations', newSpecialization);

        }
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function deleteSpecializations(id) {
    try {
        const response = await apiRequest('DELETE', `specializations/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}