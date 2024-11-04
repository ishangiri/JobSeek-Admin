import { useDashboardContext } from "../pages/DashboardLayout";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

import React from 'react'

const NavLinks = ({isBigSideBar}) => {

    const {toggleSideBar, user} = useDashboardContext();


  return (

    <div className='nav-links'>
    {links.map((link) => {
      const {text, path, icon} = link;
      return <NavLink to={path} key={text} onClick={ isBigSideBar? null : toggleSideBar} end className="nav-link">
      <span className='icon'>{icon}</span>
      {text}
      </NavLink>
    })}
   </div>

  )
}

export default NavLinks;