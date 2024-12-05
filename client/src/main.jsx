import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'
import './index.css'
// import { ContextProvider } from './context/RegistrationContext.jsx'

  
createRoot(document.getElementById("root")).render(
  <StrictMode>
  <ToastContainer position='top-center' />
      <App />
  </StrictMode>
);
