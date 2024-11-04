import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import {FormInput, Logo} from '../components'

const Login = () => {
  return (
  <Wrapper>
    <form className='form'>
        <Logo />
        <FormInput type="email" name="email" 
        defaultValue="ishan@gmail.com"/>
        <FormInput type="paassword" name="password"
        defaultValue = "123456" />
        <button type='submit' className='btn btn-block'>
         submit
        </button>
        <button type='button' className='btn btn-block'>
         Demo User
        </button>
        <p>
          Not signed up yet?
          <Link to="/Register" className='member-btn'>
           Register
          </Link>
        </p>
    </form>
  </Wrapper>
  )
}

export default Login