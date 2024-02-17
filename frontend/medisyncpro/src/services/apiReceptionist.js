import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getReceptionist() {
    try {
        const response = await apiRequest('GET', 'receptionists');
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function getReceptionistByClinicId() {
    try {
        const response = await apiRequest('GET', 'receptionists/clinic/1');
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function getReceptionistSearch() {
    try {
        const response = await apiRequest('GET', 'receptionists/search/1');
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function addReceptionistToClinic(data) {

    try {
        const response = await apiRequest('POST', 'receptionists/addReceptionistToClinic', data);

        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}


export async function getReceptionistById(id) {
    try {
        const response = await apiRequest('GET', `receptionists/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}


export async function createEditReceptionist(newReceptionist, id) {
    try {
        let response = {}
        if (id) {
            response = await apiRequest('PUT', `receptionists`, newReceptionist);

        } else {
            response = await apiRequest('POST', 'receptionists', newReceptionist);

        }
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function deleteReceptionist(receptionistId) {
    try {
        const response = await apiRequest('DELETE', `receptionists/${receptionistId}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function deleteReceptionistFromClinic(receptionistId) {
    try {
        const response = await apiRequest('DELETE', `receptionists/clinic/${receptionistId}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function getReceptionistForProfile() {
    try {
        const response = await apiRequest('GET', `receptionists/profile`);
        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}