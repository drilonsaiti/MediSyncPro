import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getClinicSchedules(){
    try{
        const response = await apiRequest('GET','clinicSchedules');
        console.log(response.data)
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Clinic schedules could not be loaded');

    }
}


export async function createEditClinicSchedule(newClinicSchedule,id){
    console.log(newClinicSchedule)
    try{
        let response = {}
        if(id){
            response = await apiRequest('PUT',`clinicSchedules`,newClinicSchedule);

        }else{
            response = await apiRequest('POST','clinicSchedules',newClinicSchedule);

        }
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Clinic schedule could not be updated/created');

    }
}

export async function deleteClinicSchedule(id){
    try{
        const response = await apiRequest('DELETE',`clinicSchedules/${id}`);
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Clinic schedule could not be deleted');

    }
}