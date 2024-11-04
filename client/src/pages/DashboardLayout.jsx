import React, { createContext, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { NavBar, SideBar, SmallSideBar } from '../components'
import { checkDefaultTheme } from '../App'



const DashboardContext = createContext()

const DashboardLayout = () => {



  const user = {name: "Ishan"}
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

  const logoutUSer = async() => {
    console.log("Logout User");
    
  }

  return (
<DashboardContext.Provider value={{user, showSideBar, isDarkTheme, logoutUSer, toggleDarkTheme, toggleSideBar}}>
   <Wrapper>
    <main className="dashboard">
      <SmallSideBar />
      <SideBar />
      <div>
        <NavBar />
        <div className='dashboard-page'>
         <Outlet />
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