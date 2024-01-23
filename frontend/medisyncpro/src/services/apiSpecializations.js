import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getSpecializations(){
    try{
        const response = await apiRequest('GET','specializations');
        console.log(response.data)
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Specializations could not be loaded');

    }
}


export async function createEditSpecializations(newSpecialization,id){
    console.log(newSpecialization)
    try{
        let response = {}
        if(id){
            response = await apiRequest('PUT',`specializations`,newSpecialization);

        }else{
            response = await apiRequest('POST','specializations',newSpecialization);

        }
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Specializations could not be updated/created');

    }
}

export async function deleteSpecializations(id){
    try{
        const response = await apiRequest('DELETE',`specializations/${id}`);
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Specializations could not be deleted');

    }
}