import styled from 'styled-components';

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
    justify-items : center;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  .otpInput{
   margin: 0 auto;
   display : block;
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
    .paragraph{
      text-align : left;
      color: var(--primary-500);
      font-size : 0.9rem;
    }

    .otp-input-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 1rem 0;
}

.otp-input {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 1.2rem;
  border: 1px solid var(--primary-300);
  border-radius: 4px;
}

.otp-input:focus {
  outline: 2px solid var(--primary-500);
}

`;
export default Wrapper;
