import { body, param,  validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import {  JobType } from "../utils/constants.js";
import mongoose from "mongoose";
import User from "../models/userModel.js";
import Job from "../models/JobModel.js";
import OTP from '../models/otpModel.js';
import Applicant from "../models/ApplicantModel.js";


export const validationError = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        const errormessage = error.array().map((err) => err.msg);
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: errormessage });
      }
      next();
    },
  ];
};

export const validateJobInput = validationError([
  body('company').notEmpty().withMessage("company is required"),
  body('position').notEmpty().withMessage("position is required"),
  body('salary').notEmpty().withMessage('Salary is required'),
  body('jobLocation').notEmpty().withMessage("Job Location is required"),
  body('jobDescription').notEmpty().withMessage("description is required"),
  body('jobType').isIn(Object.values(JobType)).withMessage("invalid job type")
 ]) 

 export const  validateIdParam =  validationError ([
    param('id').custom( async (value, {req}) =>  {
         const isValidMongoID = mongoose.Types.ObjectId.isValid(value);
         if(!isValidMongoID){
         throw new Error("id not valid")
         }
         const job = await Job.findById(value);
         if(!job){
          throw new Error("job with id not found")
         }
         const isAdmin = req.userData.role === 'admin'
         const userID = job.createdBy.toString();
         
         const isOwner = req.userData.user === userID;

         if(!isOwner && !isAdmin){
          throw new Error("not authorized to access the job")
               
         }
    })
    ]);

    //validate the job id
 export const validateJobID = validationError([
  param('id').custom( async (value) =>  {
       const isValidMongoID = mongoose.Types.ObjectId.isValid(value);
       if(!isValidMongoID){
       throw new Error("id not valid")
       }
       const job = await Job.findById(value);
       if(!job){
        throw new Error("job with id not found")
       }
  })
  ]);

//validate the applicant id
  export const validateApplicantID = validationError([
    param('id').custom( async (value) =>  {
         const isValidMongoID = mongoose.Types.ObjectId.isValid(value);
         if(!isValidMongoID){
         throw new Error("id not valid")
         }
         const user = await Applicant.findById(value);
         if(!user){
          throw new Error("applicant with id not found")
         }
    })
    ]);


 export const validateUserRegister = validationError([
    body('company').notEmpty().withMessage("company is required"),
    body('email').notEmpty().withMessage("email is required").isEmail().withMessage('invalid email')
    .custom(async(email) => {
        const user = await User.findOne({email})
        if(user){
            throw new Error('email already exists');
        }
    } ),
    body('password').notEmpty().withMessage("password is required").isLength({min : 8}).withMessage('password must be 8 characters long'),
    body('location').notEmpty().withMessage("location is required"),
    body('otp').notEmpty().withMessage("Otp required to verify your email").custom(async(otp, {req}) => {
      const email = req.body.email;
      const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
      if (response.length === 0 || otp !== response[0].otp) {
       throw new Error('The OTP is not valid')
      }
    })
 ])

 export const validateUserUpdate = validationError([
  body('company').notEmpty().withMessage("company is required"),
  body('location').notEmpty().withMessage("location is required"),
])

 export const validateLogin = validationError([
  body('email').notEmpty().withMessage("email is required").isEmail().withMessage('invalid email'),
  body('password').notEmpty().withMessage("password is required")
 ])


