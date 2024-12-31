import { Router } from 'express';
const router = Router();

import { register, login, logOut } from '../controller/authController.js';
import { registerApplicant, loginApplicant, logOutApplicant } from '../controller/authController.js';
import { validateUserRegister, validateLogin} from '../middleware/validationMiddleware.js';
import { validateApplicantLogin, validateApplicantRegister } from '../middleware/applicantAuthMiddleware.js';

router.post('/register', validateUserRegister, register);
router.post('/login', validateLogin, login);
router.get('/logout', logOut);

router.post('/registerApplicant', validateApplicantRegister, registerApplicant);
router.post('/loginApplicant', validateApplicantLogin, loginApplicant);
router.get('/logoutApplicant', logOutApplicant);

export default router;