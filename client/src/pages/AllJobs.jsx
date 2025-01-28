import React, { createContext, useContext } from 'react'
import fetchData from '../utils/fetchUtil'
import { toast } from 'react-toastify'
import { useLoaderData } from 'react-router-dom'
import JobContainer from '../components/JobContainer'
import SearchContainer from '../components/SearchContainer'



   const jobsContext = createContext();
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

const {data} = useLoaderData();





 return(
  <jobsContext.Provider value={{data}}>
  <div>
    <SearchContainer />
     <JobContainer/>
  </div>
  </jobsContext.Provider>
   )


}

export const useAllJobsCOntext = () => {
  return useContext(jobsContext);
}

export default AllJobs;