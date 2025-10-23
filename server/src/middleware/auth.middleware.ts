import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {AppError} from "../core/errors/AppError";


interface JwtPayload {
    id: string;
    role: "developer" | "client";
}

/**
 * Middleware: Authenticate user and check role (if specified)
 * Usage:
 *  - requiredAuthAndRole() → any authenticated user
 *  - requiredAuthAndRole("developer") → only developers
 *  - requiredAuthAndRole("client", "developer") → multiple roles
 */
export const requiredAuthAndRole =
    (...allowedRoles: JwtPayload["role"][]) =>
        (req: Request & { user?: JwtPayload }, _res: Response, next: NextFunction) => {
            try {
                const authHeader = req.headers["authorization"];
                if (!authHeader || !authHeader.startsWith("Bearer ")) {
                    throw new AppError("Authorization token missing", 401);
                }

                const token = authHeader.split(" ")[1];
                const secret = process.env.JWT_SECRET;

                if (!secret) {
                    throw new AppError("JWT secret not configured", 500);
                }

                const decoded = jwt.verify(token, secret) as JwtPayload;
                req.user = decoded;

                if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
                    throw new AppError("Forbidden: insufficient permissions", 403);
                }

                next();
            } catch (err: any) {
                if (err.name === "JsonWebTokenError") {
                    next(new AppError("Invalid token", 401));
                } else if (err.name === "TokenExpiredError") {
                    next(new AppError("Token expired", 401));
                } else {
                    next(err);
                }
            }
        };
