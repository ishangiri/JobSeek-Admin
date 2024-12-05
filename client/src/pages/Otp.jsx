import React, { useContext, useEffect } from 'react'
import { useLocation, Form, useNavigate, useActionData, useNavigation } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import {FormInput, Logo} from '../components'
import fetchData from '../utils/fetchUtil';
import { toast } from "react-toastify";

export const submitOTP = async ({request}) => {

   const formData = await request.formData();
   const data = Object.fromEntries(formData);
   try {
  const {otp, ...registrationData} = data;
  const finalData = { ...registrationData, otp };
  console.log(finalData);
  
    await fetchData.post('/auth/register', finalData)
    return {success : true}
   } catch (error) {
    console.log(error);
    return {success : false, error}
    
   }

}

const OTP = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" ;

  const navigate = useNavigate();
  const actionData = useActionData();
  const location = useLocation();
 const registrationData = location.state;

 useEffect (() => {
  if(actionData?.success){
    toast.success("user registered successfully")
    navigate("/Login")
  } else if(actionData?.error) {
    toast.error("Something went wrong")
    navigate("/register");
  } else if(!registrationData){
    toast.error("No registration data")
    navigate("/register")
  }
 }, [actionData, navigate])

  return (
  <Wrapper>
    <Form method = "post" className='form'>
        <Logo />
        <FormInput type = "number" name = "otp"
        />
   {Object.entries(registrationData || {}).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
        <button type='submit' className='btn btn-block' hidden={isSubmitting}>
           {isSubmitting ? "Registering" : "Register"}
        </button>
    </Form>
  </Wrapper>
  )
}

export default OTP