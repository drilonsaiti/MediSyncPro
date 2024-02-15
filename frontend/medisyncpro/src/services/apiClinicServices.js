import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getClinicServices({page, specializations, sort}) {
    try {
        const response = await apiRequest('GET', 'clinic-services', null, {
            page: page !== 0 ? page : 1,
            specializations: specializations,
            sort: sort
        });
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}


export async function createEditClinicService(newClinicService, id) {
    try {
        let response = {}
        if (id) {
            response = await apiRequest('PUT', `clinic-services`, newClinicService);

        } else {
            response = await apiRequest('POST', 'clinic-services', newClinicService);

        }
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}

export async function deleteClinicService(id) {
    try {
        const response = await apiRequest('DELETE', `clinic-services/${id}`);
        return response.data;
    } catch (e) {
        throw new Error(e);

    }
}