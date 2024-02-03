import {apiRequest} from "../utils/services.js";

export async function getSettings() {
    try {

        const response = await apiRequest('GET', 'settings')
        //console.log(response.data[0]);
        return response.data[0];
    } catch (error) {
        console.error(error);
        throw new Error('Settings could not be loaded');
    }
}

export async function updateSetting(newSetting) {
    console.log("======nEW SETTINGS=====")
    console.log(newSetting);
    try {
        let response = {};

        if (!newSetting.id) {
            response = await apiRequest('POST', 'settings', newSetting)
        }

        if (newSetting.id) {

            response = await apiRequest('PUT', `settings/${newSetting.id}`, newSetting);
        }
        return response.data;

    } catch (error) {
        console.error(error);
        throw new Error('Settings could not be loaded');
    }
}
