
import Job from '../models/JobModel.js' ;
import Applicant from '../models/ApplicantModel.js';
import { StatusCodes } from 'http-status-codes';
import { mailSender } from "../utils/mailSender.js";




//getting all the jobs
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({createdBy: req.userData.user});
    res.status(StatusCodes.OK).json({ jobs });
  };

  //get the applicants that applied to the job.
  export const getAllApplicants = async (req, res) => {
    const  {id} = req.params;
    try {
        const job = await Job.findById(id).populate({
            path: 'applicants.applicantId',
            model: 'Applicant',
            select: 'name email lastName location resume appliedJobs'
        });

        if (!job) {
            throw new Error('Job not found');
        }

        // Extract applicants from the job
   const applicants = job.applicants.map(applicant => { 
     
    const appliedJOb = applicant.applicantId.appliedJobs.find(appliedJob => appliedJob.jobId.toString() === id);

    return {
      applicantId: applicant.applicantId._id,
      name: applicant.applicantId.name,
      email: applicant.applicantId.email,
      lastName: applicant.applicantId.lastName,
      location: applicant.applicantId.location,
      resume: applicant.resume,
      status: appliedJOb ? appliedJOb.status : 'pending'
    };
   });
    
      res.status(StatusCodes.OK).json({ applicants });
       

    } catch (error) {
        console.error('Error fetching applicants:', error);
        throw error;
    }
};

async function sendApplicationEmail(email, text) {
  try {
    const mailResponse = await mailSender(
      email,
      "Job Application Update",
      `<div>
        <h3>Dear Applicant,</h3>
           ${text}
        <p>Thank you for applying!</p>
      </div>`
    );
    console.log("Confirmation email sent:", mailResponse);
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }
}

//update status
export const updateApplicantStatus = async (req, res) => {
  const { id, applicantId } = req.params;
  const { status } = req.body;
  const text = status === 'interview' ? 'Your application has been accepted, You will soon be noticed for an interview' : 
  'Sorry, your application has been rejected.';

  try {
         const applicant = await Applicant.findById(applicantId);

        //check if the applicant exists
         const appliedJob =  applicant.appliedJobs.find(appliedJob => appliedJob.jobId.toString() === id);
           if(!appliedJob){
             throw new Error('Job not found');
           }
           //update the status
            appliedJob.status = status;
            //save the applicant schema
            await applicant.save();
            //send email regarding the status
            await sendApplicationEmail(applicant.email, text)
            res.status(StatusCodes.OK).json({ msg: 'Applicant status updated' });
    }catch (error) {
      console.error('Error updating applicant status:', error);
      throw error;
}
}

export const scheduleInterview = async (req,res) => {
  const { id, applicantId } = req.params;
  const { date, time } = req.body;
  const text = `Congratulations!!!, Your interview has been scheduled on ${date} at ${time}. Please be prepared and email us if you have any enquiries.`;

  try {
  const  applicant = await Applicant.findById(applicantId);
    const appliedJob =  applicant.appliedJobs.find(appliedJob => appliedJob.jobId.toString() === id);
    if(!appliedJob){
      throw new Error('Job not found');
    }
     
    if(appliedJob.status === 'interview'){
      sendInterviewEmail(applicant.email, text);
      res.status(StatusCodes.OK).json({ msg: 'Interview scheduled' });
    }

  } catch (error) {
    console.error('Error scheduling interview:', error);
   }

}


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

