import { body } from "express-validator";
import { validationError } from "./validationMiddleware.js"
import Applicant from '../models/ApplicantModel.js';
import ApplicantOTP from '../models/ApplicantOtpModel.js';

export const validateApplicantRegister = validationError([
    body('name').notEmpty().withMessage("name is required"),
    body('email').notEmpty().withMessage("email is required").isEmail().withMessage('invalid email'),
    body('password').notEmpty().withMessage("password is required"),
    body('lastName').notEmpty().withMessage("lastName is required"),
    body('location').notEmpty().withMessage("location is required"),
    body('otp').notEmpty().withMessage("Otp required to verify your email").custom(async(otp, {req}) => {
        const email = req.body.email;
        const response = await ApplicantOTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (response.length === 0 || otp !== response[0].otp) {
            throw new Error('The OTP is not valid')
        }
    })
])

export const validateApplicantLogin = validationError([
    body('email').notEmpty().withMessage("email is required").isEmail().withMessage('invalid email'),
    body('password').notEmpty().withMessage("password is required")
])

export const validateApplicantUpdate = validationError([
    body('name').notEmpty().withMessage("name is required"),
    body('location').notEmpty().withMessage("location is required"),
])          


