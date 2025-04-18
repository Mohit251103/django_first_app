import axios from "axios";
import { getCookie } from "./getCookie";

const csrfToken = getCookie("csrftoken");
console.log(csrfToken);

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true,
    headers: {
        "X-CSRF-Token": csrfToken
    }
});