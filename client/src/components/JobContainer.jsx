
import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout';
import { BsCursorFill } from "react-icons/bs";
import { useAllJobsCOntext } from '../pages/AllJobs';
const JobContainer = () => {

  const {isDarkTheme} = useDashboardContext();
  const {data} = useAllJobsCOntext();
  const {jobs} =  data;
  



  const textColor = (jobStatus) => {
    if(jobStatus === "declined"){
      return "red";
    } 
     if(jobStatus === "pending"){
      return "yellow";
    } 
     if(jobStatus === "interview"){
      return "green"
    }
  }

  if(jobs.length === 0){
    return(
      <div className='flex justify-center items-center'>
        <h4>No jobs to display</h4>
      </div>
    )
  }

  return (
   <div className='flex flex-wrap gap-6 justify-center'>
      {jobs.map((job) => {
        return (
          <div key={job._id} style={{backgroundColor :  isDarkTheme ?  "#4D4D4D" : "white"}} className="border border-gray-700 sm:w-1/2 lg:w-1/3 rounded-lg p-6 m-6 w-full shadow-lg">
          <section className="flex flex-col gap-6">
          <div className="flex justify-between">
            <p className="font-semibold">Position:</p>
            <p>{job.position}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Company:</p>
            <p>{job.company}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Status:</p>
            <p style={{color : textColor(job.jobStatus)}}>{job.jobStatus}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Job Type:</p>
            <p>{job.jobType}</p>
          </div>
          
          <div className="flex justify-between">
          <div className='flex'><BsCursorFill/> <p>{job.jobLocation}</p></div>
            <p>{job.updatedAt}</p>
          </div>
        </section>
        </div>
        )
      })}
   
    </div>
  );
};


export default JobContainer