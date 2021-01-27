import axios from "axios";
import config from "../config";
import { loginInterface } from "interfaces/service";

const instance = axios.create({
    baseURL: config.BACKURL,
    timeout: 10000,
});

const header_token = (token: string) => ({
    headers: { Authorization: `Bearer ${token}` },
});

const api = {
    auth: {
        login: (userPass: loginInterface) =>
            instance.post(`/auth/login`, userPass),
    },
};

export default api;
