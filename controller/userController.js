import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from '../models/JobModel.js'
import dotenv from "dotenv";
import s3 from "../utils/AWSconfig.js";
import path from 'path';
import { nanoid } from "nanoid";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

//generate unique fileName using nanoID
const generateUniqueFileName = (fileName) => {
   const id = nanoid();
   const ext = path.extname(fileName);
   return `${id}${ext}`;
}


//get the current user
export const getCurrentUser = async(req,res) => {
    const userID = req.userData.user;
    const user = await User.findById(userID);
    const userWIthoutpass = user.toJSON();
    res.status(StatusCodes.OK).json({userWIthoutpass});

}


//get the application status
export const getAppStats = async(req,res) => {
    const user = await User.countDocuments();
    const jobs = await Job.countDocuments();
    res.status(StatusCodes.OK).json({user, jobs});

}

//update the admin user profile
export const updateUser = async(req,res) => {
    try{
    const {company, location} = req.body;
    await User.findByIdAndUpdate(req.userData.user, {company, location}); 
    res.status(StatusCodes.OK).json({msg : "user updated successfully"})
}catch(err){
        console.log("Error updating user", err);
        res.status(StatusCodes.BAD_REQUEST).json({err});
    }
}


export const updateAvatar = async (req, res) => {
    try {
      const { file } = req;
      const userId = req.userData.user;
  
      // Fetch the user document to get current avatarKey
      const userDoc = await User.findById(userId);
      if (!userDoc) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
      }
  
      let avatar;
      let avatarKey;
  
      if (file) {
        const fileName = generateUniqueFileName(file.originalname);
  
        // Corrected 'Key' in uploadParams
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME2,
          Key: `avatars/${fileName}`, // Capital 'K' here
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        };
  
        await s3.send(new PutObjectCommand(uploadParams));
  
        avatar = `https://${process.env.AWS_BUCKET_NAME2}.s3.${process.env.AWS_REGION}.amazonaws.com/avatars/${fileName}`;
        avatarKey = `avatars/${fileName}`;
      }
  
      // Update user with new avatar and avatarKey
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { avatar, avatarKey },
        { new: true }
      );
  
      // Delete old avatar if a new one was uploaded and old exists
      if (file && userDoc.avatarKey) {
        const deleteParams = {
          Bucket: process.env.AWS_BUCKET_NAME2,
          Key: userDoc.avatarKey,
        };
        await s3.send(new DeleteObjectCommand(deleteParams));
      }
  
      res.status(StatusCodes.OK).json({ msg: "Avatar updated successfully" });
    } catch (err) {
      console.error("Error updating avatar:", err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
    }
  };
