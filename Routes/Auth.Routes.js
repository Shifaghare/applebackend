import { Router } from "express";
import { Register,Login } from "../Controllers/Auth.Controllers.js";

const router=Router()
router.post('/register',Register)
router.post('/login',Login)

export default router