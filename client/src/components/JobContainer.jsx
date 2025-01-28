
import React, { useEffect } from 'react'
import { useDashboardContext } from '../pages/DashboardLayout';
import { BsCursorFill } from "react-icons/bs";
import { useAllJobsCOntext } from '../pages/AllJobs';
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import fetchData from '../utils/fetchUtil';
import { toast } from 'react-toastify';
import { useState } from 'react';

const JobContainer = () => {

  const {isDarkTheme} = useDashboardContext();
  const {data} = useAllJobsCOntext();
  const {jobs} =  data;
  const [allJobs, setJobs] = useState(jobs || []);

  
  useEffect(() => {
   setJobs(jobs || []);
    return;
  },[jobs])
  

  const deleteJob = async (jobID) => {
    try{
       await fetchData.delete(`/jobs/${jobID}`);
       toast.success("Job deleted successfully");
       setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobID));
    }catch(error){
      console.log(error);
      toast.error("Something went wrong");
    }
  }

   if(allJobs.length === 0){
     return  <p className='sm:m-48 m-4 text-2xl font-bold flex justify-center items-center'>No jobs to display....</p> 
   }

  

  return (
    <div>
    <div className='flex justify-center m-4'>
    <p className='font-extrabold text-2xl'>{allJobs.length} {allJobs.length === 1 ? "job" : "jobs"} found</p>
    </div>
   <div className='flex flex-wrap gap-6 justify-center'>
     
  
      {allJobs.map((job) => {
        const jobID = job._id;
        const date = job.updatedAt;
       const time =  new Date(date).toLocaleDateString();
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
            <p className="font-semibold">Applicants:</p>
            <p className='border-2 border-none rounded-lg p-2 bg-slate-500' style={{color : 'white'}}>{job.applicants.length}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Job Type:</p>
            <p>{job.jobType}</p>
          </div>
          
          <div className="flex justify-between">
          <div className='flex'><BsCursorFill/> <p>{job.jobLocation}</p></div>
            <p className='font-semibold italic'>{time}</p>
          </div>
          <div className='flex justify-center items-center gap-4'>
            <Button asChild style = {{backgroundColor : "transparent"}} variant="outline">
              <Link to = {`../edit-job/${jobID}`} > Edit </Link>

            </Button>
            <Button variant = "destructive" onClick = {() => deleteJob(jobID)}>Delete</Button>
          </div>
          <div className='flex justify-center items-center'>
          <Button asChild style = {{backgroundColor : "transparent"}} variant="outline">
              <Link to = {`../view-applicants/${jobID}`} > View Applicants </Link>

            </Button>
          </div>

        </section>
        </div>
        )
      })}
   
    </div>
    </div>
  );
};


export default JobContainer