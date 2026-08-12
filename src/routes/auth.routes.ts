import { Router } from 'express';
import { loginSchema } from '../validators/auth.validator';
import { validate } from '../middlewares/validate';
import { login } from '../controllers/AuthController';
import { authRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.post('/login', authRateLimiter, validate(loginSchema), login);
export default router;
