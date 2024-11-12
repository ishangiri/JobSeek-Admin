import { body, param,  validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { JobStatus, JobType } from "../utils/constants.js";
import mongoose from "mongoose";
import User from "../models/userModel.js";

const validationError = (validateValues) => {
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
  body('jobLocation').notEmpty().withMessage("Job Location is required"),
  body('jobStatus').isIn(Object.values(JobStatus)).withMessage("invalid job status"),
  body('jobType').isIn(Object.values(JobType)).withMessage("invalid job type")
 ]) 

 export const validateIdParam = validationError([
    param('id').custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage('invalid MongoDB id')
 ]);


 export const validateUserRegister = validationError([
    body('name').notEmpty().withMessage("name is required"),
    body('email').notEmpty().withMessage("email is required").isEmail().withMessage('invalid email')
    .custom(async(email) => {
        const user = await User.findOne({email})
        if(user){
            throw new Error('email already exists');
        }
    } ),
    body('password').notEmpty().withMessage("password is required").isLength({min : 8}).withMessage('password must be 8 characters long'),
    body('location').notEmpty().withMessage("location is required"),
    body('lastName').notEmpty().withMessage("lastName is required"),
 ])