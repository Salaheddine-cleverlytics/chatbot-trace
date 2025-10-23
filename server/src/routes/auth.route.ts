import { Router } from "express";
import { container } from "tsyringe";
import { AuthController } from "../controllers/auth.controller";

const router:Router = Router();

const authController = container.resolve(AuthController);

// Register route
router.post("/register", (req, res, next) =>
    authController.register(req, res, next)
);

// Login route
router.post("/login", (req, res, next) =>
    authController.login(req, res, next)
);

export default router;
