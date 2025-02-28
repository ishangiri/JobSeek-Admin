import mongoose from "mongoose";
import { JobType } from "../utils/constants.js";

const JobSchema = new mongoose.Schema({
    company: String,
    position : String,
    jobDescription : String,
    salary : String,
    jobType : {
        type : String,
        enum: Object.values(JobType),
        default: JobType.FullTime,
    },
    jobLocation : {
        type : String,
        default : 'my city'
    },
     createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
    },
    applicants : [{applicantId :  
        { type : mongoose.Types.ObjectId,ref : 'Applicant'},resume : String,},
]

}, {timestamps : true})

export default mongoose.model('Job', JobSchema);