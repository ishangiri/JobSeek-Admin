import 'express-async-errors';
import * as dotenv from 'dotenv';
import express from 'express';
import { authenticateUser } from './middleware/authMIddleware.js';
import cookieParser from 'cookie-parser';


const app = express();


app.use(cookieParser());
app.use(express.json());


import morgan from 'morgan';


import router from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRoutes.js';
import otpRoute from './routes/otpRoute.js';

import mongoose from 'mongoose';


dotenv.config();

const port = process.env.PORT || 5100;

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


//routes for jobs coming from jobRouter
app.use('/api/jobs', authenticateUser, router);

//routes for authentication coming from authRouter
app.use('/api/auth', authRouter);

//routes to check user status
app.use('/api/users', authenticateUser,  userRouter);

//route for sending otp
app.use('/api/otp', otpRoute);

//not found route
app.use('*', (req,res) => {
    res.status(404).json({msg : "Route Not Found"})
})

  //error route
  app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ msg: 'something went wrong' });
  });
 

try{
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, ()=> {
        console.log("Server running on " + port);
        
    })

} catch(error){
    console.log(error);
    process.exit(1)
}

