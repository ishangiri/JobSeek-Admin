
import Job from '../models/JobModel.js' ;
import { StatusCodes } from 'http-status-codes';

//getting all the jobs
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({createdBy: req.userData.user});
    res.status(StatusCodes.OK).json({ jobs });
  };
  
  //create Job controller
  export const createJob = async (req, res) => {
    console.log(req.userData);
    
    req.body.createdBy = req.userData.user;
  const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
  };
  
  //getting the job with the specific id
  export const getJob = async (req, res) => {
    const { id } = req.params;
      const job = await Job.findById(id);
    
    if (!job) {
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

