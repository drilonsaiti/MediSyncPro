import axios from "axios";
import Cookies from "universal-cookie";
import {useGetRole} from "../services/useGetRole.js";
import {useFindByEmailOrContactNumber} from "../features/Patient/useFindByEmailOrContactNumber.js";

export const BASE_URL = "http://localhost:9091/api";

const cookies = new Cookies();
export const HEADERS = {
    "content-type": "application/json",
    "accept": "application/json",
    "Authorization": `Bearer ${cookies?.get('accessToken') ?? cookies.get("refreshToken")}`
};


function shouldIncludeHeaders(url) {
    const excludeHeadersURLs = ['auth/login', 'auth/register'];
    return !excludeHeadersURLs.includes(url);
}


export const apiRequest = async (method, url, data = null, params = null) => {
    try {
        const config = {
            method,
            url: `${BASE_URL}/${url}`,
            data: method !== 'GET' ? data : null,
            headers: shouldIncludeHeaders(url) ? HEADERS : {},
            params: {...params} // Corrected here, no need for an additional 'params' key
        };

        return await axios(config);
    } catch (error) {
        console.error(error.response.data);
        throw new Error(error.response.data);
    }
};

export function Roles() {
    const {roles, isLoading} = useGetRole();
    if (!isLoading)
        return roles;
}



export const getInitialRoute = () => {
    const roles = Roles();
    return roles.includes("ADMIN") ? "/accommodations" : "/accommodationsUser";
};
