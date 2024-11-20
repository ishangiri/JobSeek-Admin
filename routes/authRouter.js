import { Router } from 'express';
const router = Router();

import { register, login, logOut } from '../controller/authController.js';
import { validateUserRegister, validateLogin} from '../middleware/validationMiddleware.js';

router.post('/register', validateUserRegister, register);
router.post('/login', validateLogin, login);
router.get('/logout', logOut);
export default router;