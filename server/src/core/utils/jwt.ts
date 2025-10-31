import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../../config/config";
import { AppError } from "../errors/AppError";

const JWT_SECRET = config.jwt.secret;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET must be defined in environment variables");
}

export interface TokenPayload extends JwtPayload {
    id: string;
    role: string;
}

export const generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string): TokenPayload => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        if (!decoded || typeof decoded !== "object" || !decoded.id || !decoded.role) {
            throw new AppError("Invalid token payload", 400);
        }
        return {
            id: decoded.id as string,
            role: decoded.role as string,
            iat: decoded.iat,
            exp: decoded.exp,
        };
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new AppError("Token has expired", 401);
        }
        if (error instanceof jwt.JsonWebTokenError) {
            throw new AppError("Invalid token", 401);
        }
        throw new AppError("Token verification failed", 401);
    }
};
