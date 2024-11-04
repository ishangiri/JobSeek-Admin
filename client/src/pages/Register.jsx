import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormInput } from "../components";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormInput type="text" name="name" defaultValue="Ishan" />
        <FormInput
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="Giri"
        />
        <FormInput type="text" name="location" defaultValue="Gold Coast" />
        <FormInput type="email" name="email" defaultValue="ishan@mgmail.com" />
        <FormInput type="password" name="password" defaultValue="123456" />
        <button type="submit" className="btn btn-block">
          Register
        </button>
        <p>
          Already registered?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
