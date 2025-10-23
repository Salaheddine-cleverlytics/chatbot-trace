import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { AuthService } from "../services/auth.service";
import { LoginInputSchema, RegisterInputSchema } from "../schema/user/user.input";

@injectable()
export class AuthController {
    constructor(@inject(AuthService) private authService: AuthService) {}

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const parsed = RegisterInputSchema.parse(req.body);
            const result = await this.authService.register(parsed);
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const parsed = LoginInputSchema.parse(req.body);
            const result = await this.authService.login(parsed);
            res.status(200).json({
                success: true,
                message: "Login successful",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }
}
