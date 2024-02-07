import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getClinics({page, specializations, service, byDate}) {

    try {
        const response =
            await apiRequest('GET', 'clinics', null, {
                page: page,
                specializations: specializations,
                service: service,
                byDate: byDate
            });
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function getClinicServiceBy(id) {
    try {
        const response = await apiRequest('GET', `clinics/services/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function getClinicById(id) {
    try {
        const response = await apiRequest('GET', `clinics/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}


export async function createEditClinic(newClinic, id) {
    try {
        let response = {}
        if (id) {
            response = await apiRequest('PUT', `clinics`, newClinic);

        } else {
            response = await apiRequest('POST', 'clinics', newClinic);

        }
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function deleteClinic(id) {
    try {
        const response = await apiRequest('DELETE', `clinics/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}