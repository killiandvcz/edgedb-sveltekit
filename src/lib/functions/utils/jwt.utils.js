import jwt from "jsonwebtoken";
import {token as jwtKeys} from "$lib/constants/keys.js";

export const createToken = (payload, key, expiresIn = '30d') => {
    return jwt.sign(payload, jwtKeys[key], {expiresIn});
}

export const verifyToken = (token, key) => {

    return jwt.verify(token, jwtKeys[key], {}, (err, decoded) => {
        if (err) {
            let split = [...err.name.matchAll(/([A-Z][a-z]*)/gm)].map(m => m[0].toUpperCase());
            return {
                pass: false,
                code: split.join('_'),
                message: err.message,
            };
        }
        return {
            pass: true,
            payload: decoded,
        };
    });
}

