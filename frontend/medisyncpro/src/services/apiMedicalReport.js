import {apiRequest} from "../utils/services.js";
import error from "eslint-plugin-react/lib/util/error.js";


export async function getMedicalReports(){
    try{
        const response = await apiRequest('GET','medicalReports');
        console.log(response.data)
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Medical reports could not be loaded');

    }
}


export async function getMedicalReportById(id){
    try{
        const response = await apiRequest('GET',`medicalReports/${id}`);
        console.log(response.data)
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Medical report could not be loaded');

    }
}

export async function createEditMedicalReport(newMedicalReport,id){
    console.log(newMedicalReport)
    try{
        let response = {}
        if(id){
            response = await apiRequest('PUT',`medicalReports`,newMedicalReport.newData);

        }else{
            response = await apiRequest('POST','medicalReports',newMedicalReport.newData);

        }
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Medical report could not be updated/created');

    }
}

export async function deleteMedicalReport(id){
    try{
        const response = await apiRequest('DELETE',`medicalReports/${id}`);
        return response.data;
    }catch (e) {
        console.error(error);
        throw new Error('Medical report could not be deleted');

    }
}