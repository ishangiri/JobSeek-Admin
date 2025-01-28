import React, { useEffect, useState } from 'react'
import JobsApplicantsUI from '../components/JobApplicants';
import fetchData from '../utils/fetchUtil';
import { useLoaderData, useParams } from 'react-router-dom';
import { set } from 'mongoose';

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
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplicants();
  }, [selectedJobId]); 

  return (
    <div> 
      <JobsApplicantsUI jobs={jobs}  applicants = {applicants} selectedJobId={selectedJobId} setSelectedJobId={setSelectedJobId}/>
    </div>
  )
}



export default ViewApplicants;