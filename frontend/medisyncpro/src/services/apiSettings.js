import {apiRequest} from "../utils/services.js";

export async function getSettings() {
    try {

        const response = await apiRequest('GET', 'settings/id')
        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}

export async function updateSetting(newSetting) {

    try {
        let response = {};

        if (!newSetting.id) {
            response = await apiRequest('POST', 'settings', newSetting)
        }

        if (newSetting.id) {

            response = await apiRequest('PUT', `settings/${newSetting.id}`, newSetting);
        }
        return response.data;

    } catch (e) {
        throw new Error(e);
    }
}
