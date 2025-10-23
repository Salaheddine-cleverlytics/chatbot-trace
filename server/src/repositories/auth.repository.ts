// src/repositories/auth.repository.ts

import { Types } from "mongoose";
import {IUser, User} from "../models/user.model";
import {injectable} from "tsyringe";


@injectable()
export class AuthRepository {
    /**
     * Find a user by email
     */
     async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email });
    }

    /**
     * Find a user by ID
     */
     async findById(id: string | Types.ObjectId): Promise<IUser | null> {
        return User.findById(id);
    }

    /**
     * Create a new user (developer or client)
     */
     async create(userData: Partial<IUser>): Promise<IUser> {
        const user = new User(userData);
        return user.save();
    }

    /**
     * Update user by ID (e.g., change password, update info)
     */
     async updateById(id: string | Types.ObjectId, updateData: Partial<IUser>): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, updateData, { new: true });
    }
}
