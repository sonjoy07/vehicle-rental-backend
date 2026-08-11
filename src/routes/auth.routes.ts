import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { loginSchema } from "../validators/auth.validator";
import { validate } from "../middlewares/validate";
import { login } from "../controllers/AuthController";

const router = Router();

router.post('/login', authMiddleware, validate(loginSchema), login)
export default router