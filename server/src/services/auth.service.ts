// src/services/auth.service.ts
import { AuthRepository } from "../repositories/auth.repository";
import {LoginInput, RegisterInput, RegisterInputSchema} from "../schema/user/user.input";
import {generateToken} from "../core/utils/jwt";
import {injectable} from "tsyringe";
import {AppError} from "../core/errors/AppError";
import {UserOutput, UserOutputSchema} from "../schema/user/user.output";

@injectable()
export class AuthService {


    constructor( private authRepository: AuthRepository) {}


    /**
     * Register a new user (developer or client)
     */
     async register(input: RegisterInput): Promise<UserOutput> {
       const parsed = RegisterInputSchema.parse(input);
        const existingUser = await this.authRepository.findByEmail(parsed.email);
        if (existingUser) {
            throw new AppError("Email already in use",409);
        }
        const user = await this.authRepository.create(parsed);
        const token = generateToken({ id: user.id, role: user.role });
        const userOutput = {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            token,
        };
        return UserOutputSchema.parse(userOutput);
    }

    /**
     * Login an existing user
     */
     async login(input: LoginInput): Promise<UserOutput> {
        const user = await this.authRepository.findByEmail(input.email);
        if (!user) {
            throw new AppError("Invalid email or password", 401);        }
        if (user.password !== input.password) {
            throw new AppError("Invalid email or pxassword", 401);        }
        const token = generateToken({ id: user.id.toString(), role: user.role });

        const userOutput = {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            token,
        };
        return UserOutputSchema.parse(userOutput);
    }
}
