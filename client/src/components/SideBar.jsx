import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import Logo from './Logo'
import NavLinks from './NavLinks'
import { useDashboardContext } from '../pages/DashboardLayout'

const SideBar = () => {
   
   const {showSideBar, toggleSideBar} = useDashboardContext();

    return(
 <Wrapper>
    <div className={showSideBar? 'sidebar-container' : ' show-sidebar sidebar-container'}>
       <div className="content">
         <header>
            <Logo />
         </header> 
         <NavLinks isBigSideBar/>
       </div>
    </div>
 </Wrapper>
    )
}



export default SideBar;