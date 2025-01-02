import React from 'react'
import background from '../assets/images/background.webp';
import Wrapper from '../assets/wrappers/LandingPage';
import {Link} from 'react-router-dom';

const Landing = () => {

  return (
    <Wrapper>
      <nav>
      </nav>
      <div className="container page">
        <div className='info'>
          <h1>
             Job <span>Seek </span>Admin 
          </h1>
          <p className='text-2xl font-serif'>Job Postings made easy</p>
          <p className='text-blue-200'>Find the best candidates for your company</p>
          <p>Post Jobs for your company</p>
          <p>See the stats for your jobs posted</p>
          <p>Get alerts for interviews and deadlines</p>
          <p>Track the job applications</p>
            <Link to="/register" className='btn register-link'>Register Your Company</Link>
            <Link to="/Login" className='btn  '>Login</Link>
        </div>
        <img src={background} alt="job hunt" className=' img sm:h-96'/>
      </div>
    </Wrapper>
  )
}

export default Landing