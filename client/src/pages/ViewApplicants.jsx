import React, { useEffect, useState } from 'react'
import JobsApplicantsUI from '../components/JobApplicants';
import fetchData from '../utils/fetchUtil';
import { useLoaderData, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export const fetchJobs = async ({ request }) => {
  try {
    const { data } = await fetchData.get('/jobs');
    return {
      data,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};




 const ViewApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const {data} = useLoaderData();
  const {jobs} = data;
  const {id} = useParams();
  const [selectedJobId, setSelectedJobId] = useState(id);



  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const { data } = await fetchData.get(`/jobs/applicants/${selectedJobId}`);
        setApplicants(data.applicants);
        console.log(data.applicants);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, [selectedJobId]); 


  const handleStatusChange = async (applicantId, newStatus) => {
    try {
      const id = selectedJobId;
      
      // No need to set state here, use the function parameter directly
      await fetchData.patch(`/jobs/applicant/${applicantId}/job/${id}`, { status: newStatus });
      console.log(`Updated applicant ${applicantId} status to ${newStatus}`);
  
      // Update the local state to reflect the new status
      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant.applicantId === applicantId ? { ...applicant, status: newStatus } : applicant
        )
      );
    } catch (error) { 
      console.log(error);
    }
  };

  const scheduleInterview = async (applicantId, date, time) => {
    try{
      const formattedDate  = date.toLocaleDateString();
      console.log(applicantId, formattedDate, time);
      
      await fetchData.post(`/jobs/applicant/${applicantId}/schedule-interview/job/${selectedJobId}`, {
        date : formattedDate,
        time
    });
        toast.success("Interview scheduled successfully");
    }catch(error){
      console.log(error); 
    }
  }
  

  return (
    <div> 
      <JobsApplicantsUI jobs={jobs} 
       applicants = {applicants}
        selectedJobId={selectedJobId} 
        setSelectedJobId={setSelectedJobId}
         handleStatusChange={handleStatusChange}
         openCalendar={scheduleInterview}
         />
    </div>
  )
}



export default ViewApplicants;