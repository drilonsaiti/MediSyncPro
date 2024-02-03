import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getReceptionist() {
    try {
        const response = await apiRequest('GET', 'receptionists');
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Receptionists could not be loaded');

    }
}

export async function getReceptionistById(id) {
    try {
        const response = await apiRequest('GET', `receptionists/${id}`);
        console.log("=====PATIENT=====");
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error('Receptionist could not be loaded');
    }
}


export async function createEditReceptionist(newReceptionist, id) {
    console.log(newReceptionist)
    try {
        let response = {}
        if (id) {
            response = await apiRequest('PUT', `receptionists`, newReceptionist);

        } else {
            response = await apiRequest('POST', 'receptionists', newReceptionist);

        }
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Receptionist could not be updated/created');

    }
}

export async function deleteReceptionist(id) {
    try {
        const response = await apiRequest('DELETE', `receptionists/${id}`);
        return response.data;
    } catch (e) {
        console.error(error);
        throw new Error('Receptionist could not be deleted');

    }
}