import { NextFunction, Request, Response, Router } from "express";
import { ChatbotController } from "../controllers/chatbot.controller";
import { container } from "tsyringe";
import { requiredAuthAndRole } from "../middleware/auth.middleware";

const router: Router = Router();
const chatbotController: ChatbotController = container.resolve(ChatbotController);

// Create a chatbot
router.post(
    "/",
    requiredAuthAndRole("developer"),
    (req: Request, res: Response, next: NextFunction) =>
        chatbotController.create(req, res, next)
);

// Update a chatbot
router.put(
    "/:id",
    requiredAuthAndRole("developer"),
    (req: Request, res: Response, next: NextFunction) =>
        chatbotController.update(req, res, next)
);

// Delete a chatbot
router.delete(
    "/:id",
    requiredAuthAndRole("developer"),
    (req: Request, res: Response, next: NextFunction) =>
        chatbotController.delete(req, res, next)
);

// Get all chatbots
router.get(
    "/",
    requiredAuthAndRole("developer"),
    (req: Request, res: Response, next: NextFunction) =>
        chatbotController.getAll(req, res, next)
);

// Get chatbot by ID
router.get(
    "/:id",
    requiredAuthAndRole("developer"),
    (req: Request, res: Response, next: NextFunction) =>
        chatbotController.getById(req, res, next)
);

// Get chatbots by user ID
router.get(
    "/user/:userId",
    requiredAuthAndRole("developer"),
    (req: Request, res: Response, next: NextFunction) =>
        chatbotController.getByUser(req, res, next)
);

export default router;
