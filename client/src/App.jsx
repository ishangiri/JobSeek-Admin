import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashBoardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  OTP

} from './pages'

import { registerFormSubmission } from "./pages/Register.jsx";
import { submitOTP } from "./pages/Otp.jsx";
import { loginUser } from "./pages/Login.jsx";
import { loadJobs } from "./pages/AllJobs.jsx";

 export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
}
 checkDefaultTheme();


const router =  createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout/>,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />
      },
      {
        path: 'register',
        element: <Register />,
        action : registerFormSubmission
      },
      {
        path: 'login',
        element: <Login />,
        action : loginUser
      },

      {
        path : 'OTP',
        element : <OTP/>,
        action: submitOTP
      },
      {
        path: 'dashboard',
        element: <DashBoardLayout />,
        children:[
          {
            index: true,
            element: <AddJob />
          }, 
          {
            path: 'stats',
            element: <Stats />
          },
          {
            path: 'all-jobs',
            element: <AllJobs/>,
            loader : loadJobs

          },
          {
            path: 'profile',
            element: <Profile/>
          },
          {
            path: 'admin',
            element: <Admin/>
          },

        ]
      },
    ]
  }, 
  
  {
    path: '/Error',
    element: <Error /> 
  }
])

 const App = () => {
  return (
    <RouterProvider router={router} />
  )
}


export default App;