import { Router } from 'express';
const router = Router();
import upload from '../middleware/multerMiddleware.js';

import {updateUser, getAppStats, getCurrentUser, updateAvatar } from '../controller/userController.js';
import { validateUserUpdate } from "../middleware/validationMiddleware.js";
import { checkIfAdmin } from '../middleware/authMIddleware.js';

router.patch('/updateUser', validateUserUpdate, updateUser);
router.patch('/updateAvatar', upload.single("avatar"), updateAvatar )
router.get('/getUser',  getCurrentUser);
router.get('/admin/appStats', checkIfAdmin, getAppStats);
export default router;