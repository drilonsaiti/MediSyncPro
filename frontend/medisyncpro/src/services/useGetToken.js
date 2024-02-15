import axios from "axios";
import {apiRequest, BASE_URL, HEADERS} from "../utils/services.js";
import {useQuery} from "@tanstack/react-query";
import Cookies from "universal-cookie";

async function checkToken() {
    const cookies = new Cookies();

    let accessToken = cookies?.get('accessToken');
    let refreshToken = cookies?.get('refreshToken');

    let isExpired = true;
    if (accessToken) {

        const token = {token: accessToken};
        HEADERS["Authorization"] = `Bearer ${accessToken}`
        const response = await axios.post(BASE_URL + "/users/token/expired", token, {
            headers: HEADERS
        });
        isExpired = response.data;
        if (accessToken && !isExpired) return false;
    }
    if (!accessToken || !isExpired) {
        if (!refreshToken) {
            return true;
        } else {
            HEADERS["Authorization"] = `Bearer ${refreshToken}`
            const response = await apiRequest('GET', "users/token/refresh");

            if (!response.data.startsWith("Refresh") && !response.data.startsWith("No auth")) {
                cookies.set('accessToken', response.data, {
                    path: '/',
                    sameSite: 'strict',  // Adjust as needed
                    secure: true,
                    maxAge: 1800
                });
                return false;
            }
            return true;
        }
    }
    return isExpired;

}

export function useGetToken() {
    const {data: goToLogin, isLoading} = useQuery({
        queryFn: checkToken,
        queryKey: ["user"]
    })

    return {goToLogin, isLoading};
}