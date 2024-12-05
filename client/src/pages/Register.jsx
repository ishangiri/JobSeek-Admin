import React, { useEffect } from "react";
import { Link, Form, useActionData, useNavigate, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormInput } from "../components";
import fetchData from "../utils/fetchUtil";
import { toast } from "react-toastify";
export const registerFormSubmission = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  

  try {
    await fetchData.post("otp/send-otp", data);
 
    // Returning the form data to use it in navigation
    return { success: true, registrationData: data };
    
  } catch (error) {
    console.error("Error in registerFormSubmission:", error);
    return { success: false, error };
  }
};


const Register = () => {

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" ;

  const navigate = useNavigate();
  const actionData = useActionData();

//
  useEffect(() => {
    if (actionData?.success) {
      console.log(actionData.registrationData);
      toast.success("PLease enter the otp sent to your email")
       navigate('/OTP', {state : actionData.registrationData})

    } else if (actionData?.error){
      toast.error("Registration error")
    }
  }, [actionData, navigate])

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormInput type="text" name="name"/>
        <FormInput
          type="text"
          name="lastName"
          labelText="last name"
        />
        <FormInput type="text" name="location" />
        <FormInput type="email" name="email" />
        <FormInput type="password" name="password"/>
        <button type='submit' className='btn btn-block' hidden={isSubmitting}>
           {isSubmitting ? "Registering" : "Register"}
        </button>
        <p>
          Already registered?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
