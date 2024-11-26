import { Router } from 'express';
import { sendOTP } from '../controller/otpController.js';

const router = Router();

router.post('/send-otp', sendOTP);

 export default router;

