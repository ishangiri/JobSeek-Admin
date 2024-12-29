import React from 'react'
import logo from '../assets/images/logo.webp';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import {Link} from 'react-router-dom';

const Landing = () => {

  return (
    <Wrapper>
      <nav>

      </nav>
      <div className="container page">
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>Keep track of your job applications</p>
          <p>Get alerts for interviews</p>
          <p>Get alerts for job application deadlines</p>
         <p>Welco</p>
            <Link to="/register" className='btn register-link'>Register</Link>
            <Link to="/Login" className='btn  '>Login</Link>
        </div>
        <img src={logo} alt="job hunt" className='img'/>
      </div>
    </Wrapper>
  )
}

export default Landing