const config = require("../config");
const cookie = require("./cookie");
const axios = require("axios");
const { parseCookies } = require("nookies");
const Router = require("next/router");

export default {
    async setCookie(data?: any) {
        console.log({ data });
        if (data.token) cookie.set("token", data.token);
        if (data.user) cookie.set("user", data.user);
    },

    // serverCookie is from this.prop in _document.js
    getCookie(serverCookie?: any) {
        if (serverCookie) {
            return {
                token: serverCookie.token,
                user: JSON.parse(serverCookie.user || null),
                username: serverCookie.username,
            };
        }
        return {
            token: cookie.get("token"),
            user: JSON.parse(cookie.get("user")),
            username: cookie.get("username"),
        };
    },
    getToken(serverCookie?: any) {
        if (serverCookie) return serverCookie.token;
        return cookie.get("token");
    },
    getUser(serverCookie?: any) {
        if (serverCookie) return JSON.parse(serverCookie.user || null);
        return JSON.parse(cookie.get("user"));
    },
    getUsername(serverCookie?: any) {
        if (serverCookie) return serverCookie.username;
        return cookie.get("username");
    },
    logout() {
        cookie.remove("token");
        cookie.remove("user");
    },

    loggedIn() {
        return !!this.getUser();
    },

    isAdmin() {
        const user = JSON.parse(cookie.get("user"));
        if (user) return user._type === "ADMIN";
        else return false;
    },

    isInstructor() {
        const user = JSON.parse(cookie.get("user"));
        if (user) return user._type === "INSTRUCTOR" || user._type === "ADMIN";
        else return false;
    },

    getOrganization(serverCookie?: any) {
        if (serverCookie) return JSON.parse(serverCookie.organization || null);
        return JSON.parse(cookie.get("organization"));
    },

    getOrganizationId(serverCookie?: any) {
        if (serverCookie) return JSON.parse(serverCookie.organization || null);
        return JSON.parse(cookie.get("organization"))._id;
    },

    isMember() {
        const user = JSON.parse(cookie.get("user"));
        if (user) return user.status === "ACTIVE";
        else return false;
    },

    isUnsubscribed() {
        const user = JSON.parse(cookie.get("user"));
        if (user)
            return (
                new Date(user.subscriptionValidUntil) < new Date() &&
                !(user._type === "MEMBER") &&
                !(user._type === "ADMIN")
            );
        else return false;
    },
    auth(ctx?: any) {
        if (ctx) {
            parseCookies(ctx);
            const cookies =
                ctx.isServer && ctx.req.cookies.user && ctx.req.cookies;
            const token = ctx.query.token || this.getToken(cookies);
            if (ctx.req && !token) {
                ctx.res.writeHead(302, { Location: "/signin" });
                ctx.res.end();
                return;
            }
        } else {
            var token = this.getToken();
            if (!token) Router.default.push("/signin");
            return;
        }
    },
};
