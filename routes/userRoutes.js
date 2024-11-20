import { Router } from 'express';
const router = Router();

import {updateUser, getAppStats, getCurrentUser } from '../controller/userController.js';
import { validateUserUpdate } from "../middleware/validationMiddleware.js";

router.patch('/updateUser', validateUserUpdate, updateUser);
router.get('/getUser',  getCurrentUser);
router.get('/admin/appStats', getAppStats);
export default router;