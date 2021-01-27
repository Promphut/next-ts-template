import * as Cookies from "js-cookie";
import config from "../config";

const domain = {
    domain: config.DOMAIN,
    path: "/",
    secure: false,
    expires: new Date(Number(new Date()) + 7776000000),
};

export const cookie = {
    set(cookieName: string, str: string) {
        Cookies.set(cookieName, str, domain);
    },
    get(cookieName: string) {
        return Cookies.get(cookieName, domain) || null;
    },
    remove(cookieName: string) {
        Cookies.remove(cookieName, domain);
    },
};
