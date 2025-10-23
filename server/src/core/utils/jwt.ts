import jwt from "jsonwebtoken";
import {config} from "../../config/config";


const JWT_SECRET = config.jwt.secret

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET must be defined in environment variables");
}

export interface TokenPayload {
    id: string;
    role: string;
}

export const generateToken = (payload: TokenPayload): string => {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    return jwt.sign(
        payload,
        JWT_SECRET, {
        expiresIn: "7d",
    });
};

export const verifyToken = (token: string): TokenPayload => {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error("Token has expired");
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error("Invalid token");
        }
        throw new Error("Token verification failed");
    }
};