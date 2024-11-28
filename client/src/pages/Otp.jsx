import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import {FormInput, Logo} from '../components'

export const submitOTP = (data) => {
    console.log(data);
    return null;
}

const OTP = () => {



  return (
  <Wrapper>
    <form className='form'>
        <Logo />
        <FormInput type = "number" name = "otp"
        />
        <button type='submit' className='btn btn-block'>
           Submit
        </button>
    </form>
  </Wrapper>
  )
}

export default OTP