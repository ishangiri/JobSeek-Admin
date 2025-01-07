import { StatusCodes } from "http-status-codes";
import User from '../models/userModel.js';
import { hashPassword, comparePassword} from "../utils/hashPassword.js";
import { JsonToken } from "../utils/tokenUtils.js";
import Applicant from "../models/ApplicantModel.js";

//register applicant
export const registerApplicant = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const applicant = await Applicant.create(req.body);
  res.status(StatusCodes.CREATED).json({msg : "applicant created successfully"});
}
//login applicant
export const loginApplicant = async (req, res) => {
  const applicant = await Applicant.findOne({email : req.body.email});
  if(!applicant){
    res.status(StatusCodes.BAD_REQUEST).json({msg : "Applicant not found"});
  }

  const matchPassword = await comparePassword(req.body.password, applicant.password);
  if(!matchPassword){
    res.status(StatusCodes.BAD_REQUEST).json({msg : "invalid password"});
    return;
  }

  const token = JsonToken({applicant : applicant._id});

  const oneDay = 1000 * 60*60*24;
  
  res.cookie('token', token, {
   httpOnly : true,
   expires : new Date(Date.now() + oneDay),
    secure : process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.OK).json({msg : "login success"})
  
}
// logout applicant
export const logOutApplicant = (req,res) => {
res.cookie('token', 'logout', {
  httpOnly : true,
  expires : new Date(Date.now()),
});
  res.status(StatusCodes.OK).json({msg : "Logout success"})
 }



export const register = async (req, res) => {
    const isFirstAccount = await (User.countDocuments()) === 0;
    req.body.role = isFirstAccount? "admin" : "user";
      
     const hashedPassword = await hashPassword(req.body.password);
     req.body.password = hashedPassword;
    
    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({msg : "user created successfully"});

    res.cookie('token', token, {
      httpOnly : true,
      expires : new Date(Date.now() + oneDay),
       secure : process.env.NODE_ENV === 'production',
     });

     res.status(StatusCodes.OK).json({msg : "login success"})
  
  };


  export const login = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user){
      res.status(StatusCodes.BAD_REQUEST).json({msg : "user not found"});
      return;
    }
     const matchPassword = await  comparePassword(req.body.password, user.password);
     if(!matchPassword){
      res.status(StatusCodes.BAD_REQUEST).json({msg: "invalid password"})
      return;
     }

     const token = JsonToken({user : user._id, role : user.role});

     const oneDay = 1000 * 60*60*24;
  
     res.cookie('token', token, {
      httpOnly : true,
      expires : new Date(Date.now() + oneDay),
       secure : process.env.NODE_ENV === 'production',
     });

     res.status(StatusCodes.OK).json({msg : "login success"})
 
  };

export const logOut = (req,res) => {
 res.cookie('token', 'logout', {
  httpOnly : true,
  expires : new Date(Date.now())
 });
 res.status(StatusCodes.OK).json({msg : "Logout success"})
}