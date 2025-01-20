import mongoose from "mongoose";

const ApplicantSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    lastName : String,
    location : String,
    appliedJobs : [
        {
            jobId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Job'
            },
            status : {
                type : String,
                enum : ['pending', 'declined', 'interview'],
                default : 'pending'
            },
        }
    ],
})

ApplicantSchema.methods.toJSON = function(){
    let obj = this.toObject();
    delete obj.password;
    return obj;
}

export default mongoose.model('Applicant', ApplicantSchema);