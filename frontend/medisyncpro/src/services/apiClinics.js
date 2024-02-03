import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getClinics({page, specializations, service, byDate}) {

    console.log("GET CLINICS", specializations);
    try {
        const response =
            await apiRequest('GET', 'clinics', null, {
                page: page,
                specializations: specializations,
                service: service,
                byDate: byDate
            });
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Clinics could not be loaded');

    }
}

export async function getClinicServiceBy(id) {
    try {
        const response = await apiRequest('GET', `clinics/services/${id}`);
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Clinic service could not be deleted');

    }
}

export async function getClinicById(id) {
    try {
        const response = await apiRequest('GET', `clinics/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error('Clinic could not be loaded');
    }
}


export async function createEditClinic(newClinic, id) {
    console.log(newClinic)
    try {
        let response = {}
        if (id) {
            response = await apiRequest('PUT', `clinics`, newClinic);

        } else {
            response = await apiRequest('POST', 'clinics', newClinic);

        }
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Clinic could not be updated/created');

    }
}

export async function deleteClinic(id) {
    try {
        const response = await apiRequest('DELETE', `clinics/${id}`);
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Clinic could not be deleted');

    }
}