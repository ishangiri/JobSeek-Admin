import React from "react";
import { Link, Form, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormInput } from "../components";
import fetchData from "../utils/fetchUtil";

export const registerFormSubmission = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
     await fetchData.post('otp/send-otp', data )
     return redirect('/OTP');
  } catch (error) {
    return error;
  }
}

const Register = () => {



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
        <button type="submit" className="btn btn-block">
          Register
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
