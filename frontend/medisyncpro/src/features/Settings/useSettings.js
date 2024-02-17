import {QueryClient, useQuery} from "@tanstack/react-query";
import {getSettings, getSettingsDto} from "../../services/apiSettings.js";

export function useSettings() {
    const queryClient = new QueryClient();

    const {isLoading, error, data: settings} = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings
    })

    return {isLoading, error, settings};
}

export function useSettingsDto() {
    const queryClient = new QueryClient();

    const {isLoading, error, data: settings} = useQuery({
        queryKey: ['settingsDto'],
        queryFn: getSettingsDto
    })

    return {isLoading, error, settings};
}