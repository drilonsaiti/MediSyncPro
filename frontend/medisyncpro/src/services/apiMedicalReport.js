import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getMedicalReports({page, nameOrEmail, byDate}) {
    try {
        const response = await apiRequest('GET', 'medicalReports', null, {
            page: page !== 0 ? page : 1,
            nameOrEmail: nameOrEmail,
            byDate: byDate
        });
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function getMyMedicalReports({page}) {
    try {
        const response = await apiRequest('GET', 'medicalReports/myReports', null, {
            page: page !== 0 ? page : 1,
        });
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}


export async function getMedicalReportById(id) {
    try {
        const response = await apiRequest('GET', `medicalReports/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function createEditMedicalReport(newMedicalReport, id) {
    try {
        let response = {}
        if (id) {
            response = await apiRequest('PUT', `medicalReports`, newMedicalReport.newData);

        } else {
            response = await apiRequest('POST', 'medicalReports', newMedicalReport.newData);

        }
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function deleteMedicalReport(id) {
    try {
        const response = await apiRequest('DELETE', `medicalReports/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}