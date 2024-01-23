import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getClinics(){
    try{
        const response = await apiRequest('GET','clinics');
        console.log(response.data)
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Clinics could not be loaded');

    }
}


export async function createEditClinic(newClinic,id){
    console.log(newClinic)
    try{
        let response = {}
        if(id){
            response = await apiRequest('PUT',`clinics`,newClinic);

        }else{
            response = await apiRequest('POST','clinics',newClinic);

        }
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Clinic could not be updated/created');

    }
}

export async function deleteClinic(id){
    try{
        const response = await apiRequest('DELETE',`clinics/${id}`);
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Clinic could not be deleted');

    }
}