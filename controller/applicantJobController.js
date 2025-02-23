import Job from '../models/JobModel.js' ;
import { StatusCodes } from 'http-status-codes';
import Applicant from '../models/ApplicantModel.js';
import  s3  from '../utils/AWSconfig.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { mailsender } from "../utils/mailSender.js";


dotenv.config();

//mailsender function
const sendEmail = async (email, subject, text) => {
  try {
    await mailsender.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject,
      text,
    });
  } catch (error) {
    console.error("Email Error:", error);
  }
};

// Apply for a job
export const applyJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;

    // Validate input
    if (!file) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "No file uploaded" });
    }

    // Validate job existence
    const job = await Job.findById(id);
    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: `No job found with id ${id}` });
    }

    // Validate applicant existence
    const applicantId = req.userData.applicant;
    const applicant = await Applicant.findById(applicantId);
    if (!applicant) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Applicant not found" });
    }

    // Check if the applicant has already applied
    const alreadyApplied = job.applicants.some(
      (applicant) => app.applicantId.toString() === applicantId.toString()
    );
    if (alreadyApplied) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Already applied for this job" });
    }

    // Prepare file upload details
    const fileName = `resumes/${applicantId}-${id}-${Date.now()}-${file.originalname}`;
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    // Upload file to S3
    try {
      await s3.send(new PutObjectCommand(uploadParams));
    } catch (error) {
      console.error("S3 Upload Error:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error uploading file to S3" });
    }
  
    //resume url
    const resumeUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;

    // Add applicant to the job
    job.applicants.push({
      applicantId,
      resume: resumeUrl,
    });

    // Add job to the applicant's applied jobs
    applicant.appliedJobs.push({
      jobId: job._id,
      status: "pending",
    });

    // Save changes
    await Promise.all([job.save(), applicant.save()]);

    res.status(StatusCodes.OK).json({ msg: "Applied for the job successfully" });

    await sendEmail(
      applicant.email,
      <>
      <h3>Job Application Received</h3>
      <p>
        You have successfully applied for the job <strong>{job.title}</strong> at <strong>{job.company}</strong>. 
        Please wait while we review your application. We will soon get back to you with the status of your application.
      </p>
    </>
    
    );

  } catch (error) {
    console.error("Application Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Error applying for the job",
      error: error.message,
    });
  }
};

export const getOneJOb = async(req, res) => {
     const { id } = req.params;
        const job = await Job.findById(id);
      
      if (!job) {
        return res.status(404).json({ msg: `no job with id ${id}` });
      }
      res.status(200).json({ job });
}





//get all the jobs posted by admins
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.status(StatusCodes.OK).json({jobs});
}