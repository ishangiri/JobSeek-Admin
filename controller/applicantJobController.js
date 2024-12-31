import Job from '../models/JobModel.js' ;
import { StatusCodes } from 'http-status-codes';
import Applicant from '../models/ApplicantModel.js';

//apply for a job
export const applyJob = async (req, res) => {
  try{
  const { id } = req.params;
  const job = await Job.findById(id);
   const applicant = req.userData.applicant;
   console.log(applicant);
   const applicantModel = await Applicant.findById(applicant);
   console.log(applicantModel);
   
   
  if(!job){
    return res.status(StatusCodes.BAD_REQUEST).json({msg : `no job with id ${id}`});
  }
    const isApplied = job.applicants.includes(applicant);
    if(isApplied){
      return res.status(StatusCodes.BAD_REQUEST).json({msg : "already applied for this job"});
    }
    //push the applicant id to the job applicants array
    job.applicants.push(applicant);
    //push the job id to the applicant appliedJobs array
    applicantModel.appliedJobs.push({
      jobId: job._id,
      status: "pending", // Default status
    });
    //save the job and applicant
   await Promise.all([job.save(), applicantModel.save()]);
    res.status(StatusCodes.OK).json({msg : "applied for the job successfully"});
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({msg : "error applying for the job"});
    console.log(error);
  }

}

// //get all the jobs applied by the applicant
// export const getAppliedJobs = async (req, res) => {
//   const jobs = await Job.find({applicants : req.userData.user});
//   res.status(StatusCodes.OK).json({jobs});
// }

// //get all the applicants applied for the job
// export const getApplicants = async (req, res) => {
//   const { id } = req.params;
//   const job = await Job.findById(id).populate('applicants');
//   if(!job){
//     return res.status(StatusCodes.BAD_REQUEST).json({msg : `no job with id ${id}`});
//   }
//   res.status(StatusCodes.OK).json({applicants : job.applicants});
// }