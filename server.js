import * as dotenv from 'dotenv';
import express from 'express';
const app = express();
import morgan from 'morgan';
import { nanoid } from 'nanoid';

dotenv.config();

const port = process.env.PORT || 5100;

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use(express.json());

let jobs = [
    { id: nanoid(), company: 'apple', position: 'front-end' },
    { id: nanoid(), company: 'google', position: 'back-end' },
  ];

  app.get('/api/jobs', (req, res) => {
    res.status(200).json({ jobs });
  });

  app.get('/api/v1/jobs/:id', (req,res) => {
    const {id} = req.params;
    const job = jobs.find((job) => job.id === id);
    if(!job){
        throw new error('no job found');
        return res.status(404).json({msg : `no job with id ${id}`})
    }

    res.status(200).json({job})
  })
  
  const id = nanoid(10);
   console.log(id);

app.listen(port, ()=> {
    console.log("Server running on " + port);
    
})