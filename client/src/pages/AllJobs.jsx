import React, { createContext, useContext, useState, useEffect} from 'react'
import fetchData from '../utils/fetchUtil'
import { toast } from 'react-toastify'
import { useLoaderData } from 'react-router-dom'
import JobContainer from '../components/JobContainer'
import SearchContainer from '../components/SearchContainer'



   const JobsContext = createContext();
  export const loadJobs = async ({ request }) => {
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



  const AllJobs = () => {
    const { data } = useLoaderData();
    const { jobs } = data;
    const [filteredJobs, setFilteredJobs] = useState(jobs);
  
    useEffect(() => {
      setFilteredJobs(jobs);
    }, [jobs]);
  
    const handleSubmit = (formData) => {
      const { search, jobType, sortBy, datePosted } = formData;
      let filtered = [...jobs];
  
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(job => 
          job.position.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.jobLocation.toLowerCase().includes(searchLower)
        );
      }
  
      // Job type filter
      if (jobType !== 'all') {
        filtered = filtered.filter(job => 
          job.jobType.toLowerCase() === jobType.toLowerCase()
        );
      }
  
      // Date posted filter
      if (datePosted !== 'all') {
        const now = new Date();
        const ranges = {
          '24h': 1,
          'week': 7,
          'month': 30
        };
        const daysAgo = ranges[datePosted];
        filtered = filtered.filter(job => {
          const jobDate = new Date(job.updatedAt);
          const diffTime = Math.ceil((now - jobDate) / (1000 * 60 * 60 * 24));
          return diffTime <= daysAgo;
        });
      }
  
      // Sorting
      switch (sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          break;
        case 'oldest':
          filtered.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
          break;
        case 'a-z':
          filtered.sort((a, b) => a.position.localeCompare(b.position));
          break;
        case 'z-a':
          filtered.sort((a, b) => b.position.localeCompare(a.position));
          break;
        default:
          break;
      }
  
      setFilteredJobs(filtered);
    };
  
    return (
      <JobsContext.Provider value={{ filteredJobs }}>
            <SearchContainer onSubmit={handleSubmit}/>
            <JobContainer />
      </JobsContext.Provider>
    );
  };
  
  export default AllJobs;
  



export const useAllJobsContext = () => {
  return useContext(JobsContext);
}