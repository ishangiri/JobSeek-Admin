import 'express-async-errors';
import * as dotenv from 'dotenv';
import express from 'express';
const app = express();
import morgan from 'morgan';


import router from './routes/jobRouter.js';

import mongoose from 'mongoose';

dotenv.config();

const port = process.env.PORT || 5100;

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(express.json());

app.use('/api/jobs', router);

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