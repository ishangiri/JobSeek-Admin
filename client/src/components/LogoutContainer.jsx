import React from 'react'
import {  FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';
import { ImOffice } from "react-icons/im";


const LogoutContainer = () => {

    const [showLogout, setShowLogout] = useState(false);
    const {user, logoutUser} = useDashboardContext();

  return (
    <Wrapper>
        <button type='button' 
        className='btn logout-btn'
         onClick={() => {
            setShowLogout(!showLogout)
        }} >
            <ImOffice />
          {user?.company}
          <FaCaretDown />
        </button>
        <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button type='button' className='dropdown-btn' onClick={logoutUser} >
                logOut
            </button>
        </div>
    </Wrapper>
  )
}

export default LogoutContainer