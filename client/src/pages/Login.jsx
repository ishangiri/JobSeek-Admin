import React, { useEffect } from 'react'
import { Link, Form, useNavigate, useNavigation, useActionData } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import {FormInput, Logo} from '../components'
import fetchData from '../utils/fetchUtil';
import { toast } from 'react-toastify';

export const loginUser = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await fetchData.post('/auth/login', data);
    return { success: true , loginData : data};
  } catch (error) {
    console.error("Error in loginUser:", error);
    return { success: false, error };
  }
}

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" ;


  const navigate = useNavigate();
  const actionData = useActionData();

useEffect(() => {
  if(actionData?.success){
    console.log(actionData.loginData);
    toast.success("Login Successful")
    navigate('/dashboard');
  } else if(actionData?.error){
    toast.error("Invalid email or password")
  }
}, [navigate, actionData])
  
  return (
  <Wrapper>
    <Form method='post' className='form'>
        <Logo />
        <FormInput type="email" name="email"/>
        <FormInput type="password" name="password" />
        <div>
          <Link to = "/ForgotPassword" className='paragraph'>Forgot Password</Link>
        </div>
        <button type='submit' className='btn btn-block' hidden={isSubmitting}>
           {isSubmitting ? "Logging in..." : "Login"}
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
    </Form>
  </Wrapper>
  )
}

export default Login