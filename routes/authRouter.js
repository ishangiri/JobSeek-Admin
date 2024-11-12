import { Router } from 'express';
const router = Router();

import { register, login } from '../controller/authController.js';
import { validateUserRegister } from '../middleware/validationMiddleware.js';

router.post('/register', validateUserRegister, register);
router.post('/login', login);

export default router;