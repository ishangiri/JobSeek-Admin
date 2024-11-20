import { StatusCodes } from "http-status-codes";
import { verifyJWT } from "../utils/tokenUtils.js";

//this middleware sits between the jobROuters to validate the user by verifying the cookie and token created by user when loggin in. 
export const authenticateUser = (req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        res.status(StatusCodes.UNAUTHORIZED).json({msg : "authentication invalid"})
    }
 try {
    const {user, role} = verifyJWT(token);
   req.userData = {user, role}
    next();  
 } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({msg : "authentication invalid"})
    console.log(error);
    
 }


  
     
}