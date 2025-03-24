import Job from '../models/JobModel.js' ;
import { StatusCodes } from 'http-status-codes';
import Applicant from '../models/ApplicantModel.js';
import  s3  from '../utils/AWSconfig.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { mailSender } from "../utils/mailSender.js";


dotenv.config();

//mailsender function
async function sendApplicationEmail(email, jobTitle, companyName) {
  try {
    const mailResponse = await mailSender(
      email,
      "Job Application Received",
      `<div>
        <h3>Application Submitted Successfully</h3>
        <p>You've applied for <strong>${jobTitle}</strong> at ${companyName}.</p>
        <p>We'll review your application and update you soon.</p>
        <p>Thank you for applying!</p>
      </div>`
    );
    console.log("Confirmation email sent:", mailResponse);
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }
}

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
      (app) => app.applicantId.toString() === applicantId.toString()
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
    
    await sendApplicationEmail(applicant.email, job.position, job.company);

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


//get applied Jobs
export const getAppliedJobs = async (req, res) => {
  try {
    const applicantId = req.userData.applicant;

    // Find applicant and populate job details along with createdBy avatar
    const applicant = await Applicant.findById(applicantId)
      .populate({
        path: "appliedJobs.jobId",
        select: "company position jobType jobLocation salary jobDescription createdBy",
        populate: {
          path: "createdBy",
          select: "avatar company", // Fetch avatar and company from User
        },
      })
      .lean();

    if (!applicant) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Applicant not found" });
    }

    // Transform the applied jobs data
    const enhancedAppliedJobs = applicant.appliedJobs.map((job) => {
      if (!job.jobId || typeof job.jobId === "string") {
        return {
          _id: job._id,
          jobId: job.jobId || "deleted",
          status: job.status,
          interViewScheduled: job.interViewScheduled || false,
          interViewDate: job.interViewDate || null,
          jobDetails: {
            position: "Position no longer available",
            company: "Company unknown",
            jobType: "Unknown",
            jobLocation: "Unknown",
            salary: "Not available",
            jobDescription: "Job no longer exists",
            avatar: null, // No avatar for deleted jobs
          },
        };
      }

      return {
        _id: job._id,
        jobId: job.jobId._id,
        status: job.status,
        interViewScheduled: job.interViewScheduled || false,
        interViewDate: job.interViewDate || null,
        jobDetails: {
          position: job.jobId.position || "Unknown Position",
          company: job.jobId.company || "Unknown Company",
          jobType: job.jobId.jobType || "Not specified",
          jobLocation: job.jobId.jobLocation || "Not specified",
          salary: job.jobId.salary || "Not specified",
          jobDescription: job.jobId.jobDescription || "No description available",
          avatar: job.jobId.createdBy?.avatar || null, // Include avatar from createdBy
        },
      };
    });

    return res.status(StatusCodes.OK).json({
      appliedJobs: enhancedAppliedJobs,
      count: enhancedAppliedJobs.length,
    });
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Error getting applied jobs",
      error: error.message,
    });
  }
};