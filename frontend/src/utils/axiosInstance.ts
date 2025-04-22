import axios from "axios";
import { getCookie } from "./getCookie";

const csrfToken = getCookie("csrf_token");

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
    headers: {
        "X-CSRFToken": csrfToken
    }
});