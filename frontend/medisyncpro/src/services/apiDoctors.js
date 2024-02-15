import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getDoctors({page, specializations, service}) {
    try {
        const response = await apiRequest('GET', 'doctors', null, {
            page: page,
            specializations: specializations,
            service: service
        });
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function getDoctorsByClinicId({page, specializations, service}) {
    try {
        const response = await apiRequest('GET', 'doctors/clinic/1', null, {
            page: page,
            specializations: specializations,
            service: service
        });
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function getDoctorSearch() {
    try {
        const response = await apiRequest('GET', `doctors/allDoctors/1`);
        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}

export async function getDoctorById(id) {
    try {
        const response = await apiRequest('GET', `doctors/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}


export async function createEditDoctor(newDoctor, id) {
    try {
        let response = {}
        if (id) {
            response = await apiRequest('PUT', `doctors`, newDoctor);

        } else {
            response = await apiRequest('POST', 'doctors', newDoctor);

        }
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function deleteDoctor(id) {
    try {
        const response = await apiRequest('DELETE', `doctors/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function deleteDoctorFromClinic(doctorId, clinicId) {

    try {
        const response = await apiRequest('DELETE', `doctors/${doctorId}/${clinicId}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function addDoctorToClinic(newDoctor) {
    try {
        const response = await apiRequest('POST', 'doctors/addDoctorToClinic/1', newDoctor);

        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}