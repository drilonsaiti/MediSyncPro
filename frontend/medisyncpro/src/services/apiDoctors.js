import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getDoctors({page, specializations, service}) {
    try {
        const response = await apiRequest('GET', 'doctors', null, {
            page: page,
            specializations: specializations,
            service: service
        });
        console.log("DOCTORS",response.data)
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Doctors could not be loaded');

    }
}

export async function getDoctorById(id) {
    try {
        const response = await apiRequest('GET', `doctors/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Doctor could not be loaded');
    }
}


export async function createEditDoctor(newDoctor, id) {
    console.log(newDoctor)
    try {
        let response = {}
        if (id) {
            response = await apiRequest('PUT', `doctors`, newDoctor);

        } else {
            response = await apiRequest('POST', 'doctors', newDoctor);

        }
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Doctor could not be updated/created');

    }
}

export async function deleteDoctor(id) {
    try {
        const response = await apiRequest('DELETE', `doctors/${id}`);
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Doctor could not be deleted');

    }
}

export async function deleteDoctorFromClinic(doctorId,clinicId) {

    console.log("IDS IDS",doctorId,clinicId);
    try {
        const response = await apiRequest('DELETE', `doctors/${doctorId}/${clinicId}`);
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Doctor could not be deleted');

    }
}