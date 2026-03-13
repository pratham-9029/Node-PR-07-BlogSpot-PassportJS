import { Router } from "express";
import adminRouter from "./adminPanel.route.js";
import authRouter from "./auth.route.js";

const router = Router();

router.use('/admin', adminRouter);
router.use(authRouter);

export default router;