import { Router } from "express";
import { Register,Login, getCurrentUser } from "../Controllers/Auth.Controllers.js";

const router=Router()
router.post('/register',Register)
router.post('/signin',Login)
router.post("/getcurrentuser",getCurrentUser)
export default router