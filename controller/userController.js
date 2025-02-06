import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from '../models/JobModel.js'


export const getCurrentUser = async(req,res) => {
    const userID = req.userData.user;
    const user = await User.findById(userID);
    const userWIthoutpass = user.toJSON();
    res.status(StatusCodes.OK).json({userWIthoutpass});

}



export const getAppStats = async(req,res) => {
    const user = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(StatusCodes.OK).json({user, jobs});

}

export const updateUser = async(req,res) => {
    const {company, location} = req.body;
    if(req.body.email){
        res.status(StatusCodes.BAD_REQUEST).json({ msg : "cannot update email"})
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(req.userData.user, {company, location} ); 
    }catch(err){
        res.status(StatusCodes.BAD_REQUEST).json({err});
    }
    res.status(StatusCodes.OK).json({msg : "user updated successfully"})
}

