import Job from '../models/JobModel.js' ;
import { StatusCodes } from 'http-status-codes';
import Applicant from '../models/ApplicantModel.js';
import  s3  from '../utils/AWSconfig.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config();

//apply for a job
export const applyJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { file } = req;
    
    // Validate input
    if (!file) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "No file uploaded" });
    }

    // Log AWS configuration (for debugging)
    console.log('AWS Config:', {
      region: process.env.AWS_REGION,
      bucketName: process.env.AWS_BUCKET_NAME,
      hasAccessKey: !!process.env.AWS_ACCESS_KEY,
      hasSecretKey: !!process.env.AWS_SECRET_KEY
    });

    const job = await Job.findById(id);
    const applicant = req.userData.applicant;
    const applicantModel = await Applicant.findById(applicant);

    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: `No job with id ${id}` });
    }

    if (job.applicants.includes(applicant)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Already applied for this job" });
    }

    const fileName = `resumes/${applicant}-${id}-${Date.now()}-${file.originalname}`;
    
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const uploadResult = await s3.send(new PutObjectCommand(params));
      console.log("S3 Upload Result:", uploadResult);
    } catch (uploadError) {
      console.error("S3 Upload Error:", uploadError);
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Error uploading file to S3" });
    }

    const resumeUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    job.applicants.push({
      applicantId: applicant,
      resume: resumeUrl
    });

    applicantModel.appliedJobs.push({
      jobId: job._id,
      status: "pending"
    });

    await Promise.all([job.save(), applicantModel.save()]);

    res.status(StatusCodes.OK).json({ msg: "Applied for the job successfully" });
  } catch (error) {
    console.error("Application Error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
      msg: "Error applying for the job",
      error: error.message 
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

//get all the jobs posted by admins
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find();
  res.status(StatusCodes.OK).json({jobs});
}