import {handleErrors} from "$lib/functions/helpers/errors/handlers.js";
import {deleteCookie} from "$lib/functions/utils/cookie.utils.js";
import cookie from "cookie";
import {verifyToken} from "$lib/functions/utils/jwt.utils.js";

export const getCookies = (request) => {
    const rawCookies = request.headers.get("cookie");

    if (!rawCookies) {
        return {
            err: handleErrors({
                status: 401,
                code: 'NO_COOKIE',
                errors: [
                    {
                        message: "Cookies innexistants"
                    }
                ],
                headers: {
                    ...deleteCookie("token")
                }
            }),
            pass: false
        }
    }

    return cookie.parse(request.headers.get("cookie"))
}

export const getToken = (request) => {
    const cookies = getCookies(request);

    if (cookies.err){
        return cookies;
    }

    if (!cookies.token) {
        return {
            err: handleErrors({
                status: 401,
                code: "NO_TOKEN",
                errors: [
                    {
                        message: "Token d'authentification inexistant"
                    }
                ],
                headers: {
                    ...deleteCookie("token")
                }
            }),
            pass: false
        }
    }


    return cookies.token;
}

export const checkToken = (request, key = 'auth') => {
    const rawToken = getToken(request);

    if (rawToken.err){
        return rawToken;
    }

    const token = verifyToken(rawToken, key)

    if (!token.pass) {
        return {
            err: handleErrors({
                status: 401,
                code: token.code,
                errors: [
                    {
                        message: token.message
                    }
                ],
                headers: {
                    ...deleteCookie("token")
                }
            }),
            pass: false
        }
    }

    return token;
}