import './App.css';
import Welcome from './Welcome';
import Login from './Auth/Login';
import Registration from './Auth/Register';

import Home from './Home';
import Jobpannel from './Job_Pannel/JobPannel';
import Country from './Job_Pannel/Country';
import JobTypes from './Job_Pannel/JobTypes';
import Consultant from './Job_Pannel/Users/Consultant';
import JobSeeker from './Job_Pannel/Users/JobSeeker';
import AllUser from './Job_Pannel/Users/AllUser';
import TimeShadule from './Job_Pannel/Consultant/TimeShadule';


import PrivateRoute from './PrivateRoute'; 
import Page404 from './Error/Page404'; 
import { BrowserRouter as Router, Route, Routes, Link, Navigate, Switch, Outlet } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      {/* error page */}
      <Route path="*" element={<Page404 />} />

        <Route exact path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Use PrivateRoute for the protected route */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/jobpannel" element={<PrivateRoute element={<Jobpannel />} />} />
        <Route path="/jobpannel/country" element={<PrivateRoute element={<Country />} />} />
        <Route path="/jobpannel/job-categories" element={<PrivateRoute element={<JobTypes />} />} />
        <Route path="/jobpannel/consultant" element={<PrivateRoute element={<Consultant />} />} />
        <Route path="/jobpannel/jobseekerlist" element={<PrivateRoute element={<JobSeeker />} />} />
        <Route path="/jobpannel/userlist" element={<PrivateRoute element={<AllUser />} />} />

        {/* Consultant */}
        <Route path="/jobpannel/timeshadule" element={<PrivateRoute element={<TimeShadule />} />} />
      </Routes>
    </Router>
  );
}

export default App;
