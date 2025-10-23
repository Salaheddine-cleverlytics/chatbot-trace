import { Router } from "express";
import authRoute from "./auth.route";
import chatbotRoute from "./chatbot.route";
import traceRoute from "./trace.route";

const router:Router = Router();

router.use("/auth", authRoute);
router.use("/chatbot",chatbotRoute)
router.use("/trace",traceRoute)

export default router;
