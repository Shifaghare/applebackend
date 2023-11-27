import { Router } from "express";
import authRoutes from "./Auth.Routes.js"

const router=Router();
router.use('/auth',authRoutes)

export default router