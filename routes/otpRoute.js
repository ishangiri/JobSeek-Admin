import { Router } from 'express';
import { sendOTP } from '../controller/otpController.js';
import { sendApplicantOTP } from '../controller/otpController.js';

const router = Router();

router.post('/send-otp', sendOTP);
router.post('/send-applicant-otp', sendApplicantOTP);

 export default router;

