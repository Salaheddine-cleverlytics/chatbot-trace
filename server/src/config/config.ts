import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',

    mongodb: {
        uri: process.env.MONGODB_URI,
        options: {
            serverSelectionTimeoutMS: 5000,
        },
    },

    clientUrl: process.env.CLIENT_URL,

    jwt: {
        secret: process.env.JWT_SECRET ,
    },

    socket: {
        cors: {
            origin: process.env.CLIENT_URL,
            methods: ['GET', 'POST'],
        },
    },
};

export function validateConfig(): void {
    const required = ["MONGODB_URI", "JWT_SECRET", "CLIENT_URL"];
    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(", ")}`
        );
    }
}
