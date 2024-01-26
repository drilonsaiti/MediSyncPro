import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getAppointments(){
    try{
        const response = await apiRequest('GET','appointments');
        console.log(response.data)
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Appointments could not be loaded');

    }
}
export async function getAppointmentsByPatient(id){
    try{
        const response = await apiRequest('GET',`appointments/patient/${id}`);
        console.log("========PATIENT APP==========")
        console.log(response.data)
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Appointment could not be loaded');

    }
}


export async function createEditAppointment(newAppointment,id){
    console.log(newAppointment)
    try{
        let response = {}
        if(id){
            response = await apiRequest('PUT',`appointments`,newAppointment);

        }else{
            response = await apiRequest('POST','appointments',newAppointment);

        }
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Appointment could not be updated/created');

    }
}

export async function deleteAppointment(id){
    try{
        const response = await apiRequest('DELETE',`appointments/${id}`);
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Appointment could not be deleted');

    }
}

export async function getAppointmentDates(){
    try{
        const response = await apiRequest('GET',`appointments/dates`);
        console.log(response.data);
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Appointment dates could not be deleted');
    }
}


export async function createAppointmentByReceptionist({...data}){

    try{
        const response = await apiRequest('POST',`appointments/byReceptionist`,data.newData);
        console.log(response.data);
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Appointment cannot created');
    }
}