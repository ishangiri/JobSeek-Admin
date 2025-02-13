import React from 'react'
import {  FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';


const LogoutContainer = () => {

    const [showLogout, setShowLogout] = useState(false);
    const {user, logoutUser} = useDashboardContext();

    const avatar =  user?.avatar;

  return (
    <Wrapper>
        <button type='button' 
        className='btn logout-btn'
         onClick={() => {
            setShowLogout(!showLogout)
        }} >
          <div>
            <img className='h-5 w-5' src={avatar} />
          </div>
          {user.company}
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