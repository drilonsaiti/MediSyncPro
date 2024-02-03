import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getClinicServices({page,specializations,sort}) {
    console.log("Getclinics",page,sort)
    try {
        const response = await apiRequest('GET', 'clinic-services',null,{
            page:page !== 0 ? page : 1,
            specializations: specializations,
            sort:sort
        });
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Clinic services could not be loaded');

    }
}


export async function createEditClinicService(newClinicService, id) {
    console.log(newClinicService)
    try {
        let response = {}
        if (id) {
            response = await apiRequest('PUT', `clinic-services`, newClinicService);

        } else {
            response = await apiRequest('POST', 'clinic-services', newClinicService);

        }
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Clinic service could not be updated/created');

    }
}

export async function deleteClinicService(id) {
    try {
        const response = await apiRequest('DELETE', `clinic-services/${id}`);
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Clinic service could not be deleted');

    }
}