import { Router } from 'express';
import {
  loginValidator,
  registerValidator,
} from '../validators/auth.validators';
import { validate } from '../middleware/validate';
import { login, logout, register } from '../controllers/auth.controller';

const router = Router();

router.post('/register', validate(registerValidator), register);
router.post('/login', validate(loginValidator), login);
router.post('/logout', logout);

export { router as authRoutes };
