import React, { createContext, useContext, useEffect, useState } from 'react'
import { Outlet, redirect, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { NavBar, SideBar, SmallSideBar } from '../components'
import { checkDefaultTheme } from '../App'
import fetchData from '../utils/fetchUtil'
import { toast } from 'react-toastify'


const DashboardContext = createContext();

const DashboardLayout = () => {

  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [location, setLocation] = useState(null);
  const [email, setEmail] = useState (null);

  
  useEffect(() => {

    const fetchUserName = async() => {
      try {
        const response = await fetchData.get("/users/getUser");
         const fetchedName = response.data.userWIthoutpass.company;
         const location = response.data.userWIthoutpass.location;
         const email = response.data.userWIthoutpass.email;
         setName(fetchedName);
         setLocation(location);
         setEmail(email);
      } catch (error) {
        return error
      }  
    }

    fetchUserName();
   
  },[] )




  const user = {company : name, location : location, email : email};

 
  const [showSideBar, setShowSideBar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  
  const toggleDarkTheme = () => {
    const newDarkTHeme = !isDarkTheme;
    setIsDarkTheme(newDarkTHeme);
    document.body.classList.toggle('dark-theme', newDarkTHeme);
    localStorage.setItem('darkTheme', newDarkTHeme);
    
  }

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar)
     
  }

  const logoutUser = async () => {
      await fetchData.get("/auth/logout");
      try {
      toast.success("Logged out successfully")
      return  navigate("/");
      } catch (error) {
        toast.error("Error logging out")
        console.log(error);
        
      }
    
  }

  return (
<DashboardContext.Provider value={{user, showSideBar, isDarkTheme, logoutUser, toggleDarkTheme, toggleSideBar}}>
   <Wrapper>
    <main className="dashboard">
      <SmallSideBar />
      <SideBar />
      <div>
        <NavBar />
        <div className='dashboard-page'>
         <Outlet context={{user}} />
        </div>
      </div>
    </main>
   </Wrapper>
  </DashboardContext.Provider>
  );

};
export const useDashboardContext = () => {
 return useContext(DashboardContext);
}


export default DashboardLayout