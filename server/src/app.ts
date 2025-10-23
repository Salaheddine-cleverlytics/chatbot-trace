import express, { Express } from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { validateConfig } from "./config/config";
import { container } from "tsyringe";
import "reflect-metadata";
import router from "./routes";
import {errorHandler} from "./core/errors/errorHandler";

validateConfig();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectDB();


// Mount routes under version prefix
app.use("/api/v1", router);

app.use(errorHandler);

export { app, container };
