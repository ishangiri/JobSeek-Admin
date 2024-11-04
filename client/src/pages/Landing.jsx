import React from 'react'
import logo from '../assets/images/logo.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import {Link} from 'react-router-dom';

const Landing = () => {

  return (
    <Wrapper>
      <nav>
        <img src={logo} alt='image' className='logo' />
      </nav>
      <div className="container page">
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, magni voluptate explicabo officia harum tempore nulla cumque vero aliquid inventore repellat ullam dolor in possimus facere hic cum eos rerum
            .</p>
            <Link to="/register" className='btn register-link'>Register</Link>
            <Link to="/Login" className='btn  '>Login</Link>
        </div>
        <img src={main} alt="job hunt" className='img'/>
      </div>
    </Wrapper>
  )
}

export default Landing