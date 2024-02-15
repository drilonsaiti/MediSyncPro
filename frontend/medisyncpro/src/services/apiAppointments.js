import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getAppointments({page, nameOrEmail, types}) {
    try {
        const response = await apiRequest('GET', 'appointments', null, {
            page: page,
            nameOrEmail: nameOrEmail,
            types: types
        });
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function getMyAppointment({page}) {
    try {
        const response = await apiRequest('GET', 'appointments/myAppointment', null, {
            page: page !== 0 ? page : 1,
        });
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function getAppointmentsByPatient(id) {
    try {
        const response = await apiRequest('GET', `appointments/patient/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function getAppointmentsByDoctor(id) {
    try {
        const response = await apiRequest('GET', `appointments/doctor/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}


export async function createEditAppointment(newAppointment, id) {
    try {
        let response = {}
        if (id) {
            response = await apiRequest('PUT', `appointments`, newAppointment);

        } else {
            response = await apiRequest('POST', 'appointments', newAppointment);

        }
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function deleteAppointment(id) {
    try {
        const response = await apiRequest('DELETE', `appointments/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function getAppointmentDates(clinicId) {
    try {
        const response = await apiRequest('GET', `appointments/dates`);
        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}


export async function createAppointmentByReceptionist({...data}) {

    try {
        const response = await apiRequest('POST', `appointments/byReceptionist`, data.newData);
        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}


export async function changeAttended(data) {
    try {
        const response = await apiRequest('POST', `appointments/changeAttended/${data.appointmentId}`, {
            attended: data.attended
        });
        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}

export async function getNextAppointment(id) {
    try {
        const response = await apiRequest('GET', `appointments/nextAppointment/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}