// import { nanoid } from 'nanoid';

// let jobs = [
//   { id: nanoid(), company: 'apple', position: 'front-end developer' },
//   { id: nanoid(), company: 'google', position: 'back-end developer' },
// ];
import Job from '../models/JobModel.js' ;


//getting all the jobs
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
    res.status(200).json({ jobs });
  };
  
  //create Job controller
  export const createJob = async (req, res) => {
    const { company, position } = req.body;
  const job = await Job.create({company, position});
    res.status(200).json({ job });
  };
  
  //getting the job with the specific id
  export const getJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id)
    if (!job) {
      // throw new Error('no job with that id');
      return res.status(404).json({ msg: `no job with id ${id}` });
    }
    res.status(200).json({ job });
  };

  //update the specific job
  export const updateJob = async (req, res) => {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
    });
  
    if (!updatedJob) {
      return res.status(404).json({ msg: `no job with id ${id}` });
    }
  
    res.status(200).json({ job: updatedJob });
  };
  
  //deleting the job with the specific id
  export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const removedJob = await Job.findByIdAndDelete(id);
    if (!removedJob) {
      return res.status(404).json({ msg: `no job with id ${id}` });
    }
    res.status(200).json({ msg: 'job deleted' });
  };