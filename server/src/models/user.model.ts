import {model, Schema, Document, Types} from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "developer" | "client";
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: { type: String, required: true, minlength: 2, maxlength: 50 },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, required: true, minlength: 6 },
        role: { type: String, enum: ["developer", "client"], default: "developer" },
    },
    {
        timestamps: true,
        versionKey: false,
        toObject: {
            virtuals: true
        }
    }
);

// IMPORTANT: Virtual pour 'id'
UserSchema.virtual('id').get(function(this: { _id: Types.ObjectId }) {
    return this._id.toHexString();
});

export const User = model<IUser>("User", UserSchema);