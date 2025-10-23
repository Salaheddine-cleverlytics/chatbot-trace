import { Router } from "express";
import { container } from "tsyringe";
import { TraceController } from "../controllers/trace.controller";
import { requiredAuthAndRole } from "../middleware/auth.middleware";

const router:Router = Router();
const traceController = container.resolve(TraceController);

router.post("/", requiredAuthAndRole("developer"), (req, res, next) =>
    traceController.create(req, res, next)
);

router.get("/:id", requiredAuthAndRole("developer"), (req, res, next) =>
    traceController.getById(req, res, next)
);

router.get("/chatbot/:chatbotId", requiredAuthAndRole("developer","client"), (req, res, next) =>
    traceController.getByChatbotId(req, res, next)
);

router.put("/:id", requiredAuthAndRole("developer"), (req, res, next) =>
    traceController.update(req, res, next)
);


router.delete("/:id", requiredAuthAndRole("developer"), (req, res, next) =>
    traceController.delete(req, res, next)
);

export default router;
