import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getClinicSchedules({page, sort}) {
    try {
        const response = await apiRequest('GET', 'clinicSchedules/grouped', null, {
            page: page,
            sort: sort
        });
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}


export async function getClinicSchedulesByDoctorId(doctorId) {

    if (doctorId) {
        try {
            const response = await apiRequest('GET', `clinicSchedules/doctor/${doctorId}`,);
            return response.data;
        } catch (e) {
            throw new Error(e);

        }
    }
}

export async function createEditClinicSchedule(newClinicSchedule, id) {
    try {
        let response = {}
        if (id) {
            response = await apiRequest('PUT', `clinicSchedules`, newClinicSchedule);

        } else {
            response = await apiRequest('POST', 'clinicSchedules', newClinicSchedule);

        }
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function deleteClinicSchedule(id) {
    try {
        const response = await apiRequest('DELETE', `clinicSchedules/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function deleteClinicScheduleGrouped(id, date) {
    try {
        const response = await apiRequest('DELETE', `clinicSchedules/grouped/${id}/${date}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function generateSchedules(clinicId) {
    try {
        const response = await apiRequest('POST', `clinicSchedules/generate/${clinicId}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}