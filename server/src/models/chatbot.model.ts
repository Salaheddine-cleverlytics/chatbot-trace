
import {Schema, Document, model, Types} from "mongoose";

export interface IChatbot extends Document {
    name: string;
    environment: "dev" | "prod";
    developerId: Types.ObjectId;
    clients: Types.ObjectId[];
}

const ChatbotSchema: Schema<IChatbot> = new Schema(
    {
        name: { type: String, required: true },
        environment: { type: String, enum: ["dev", "prod"], default: "dev" },
        developerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        clients: [{ type: Schema.Types.ObjectId, ref: "User" }], // only users with role "client"
    },
    { timestamps: true ,versionKey:false}
);

export const Chatbot = model<IChatbot>("Chatbot", ChatbotSchema);
