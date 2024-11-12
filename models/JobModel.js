import mongoose from "mongoose";
import { JobStatus, JobType } from "../utils/constants.js";

const JobSchema = new mongoose.Schema({
    company: String,
    position : String,
    jobStatus : {
        type : String,
        enum: Object.values(JobStatus),
        default: JobStatus.Pending
    },
    jobType : {
        type : String,
        enum: Object.values(JobType),
        default: JobType.FullTime,
    },
    jobLocation : {
        type : String,
        default : 'my city'
    }

}, {timestamps : true})

export default mongoose.model('Job', JobSchema);