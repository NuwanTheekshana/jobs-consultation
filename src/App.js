import './App.css';
import Welcome from './Welcome';
import Login from './Auth/Login';
import Registration from './Auth/Register';

import Home from './Home';
import About from './About';
import Contact from './Contact';
import ConsultationRequest from './ConsultationRequest';
import AppointmentList from './AppointmentList';
import FindConsultant from './FindConsultant';

import Jobpannel from './Job_Pannel/JobPannel';
import Country from './Job_Pannel/Country';
import JobTypes from './Job_Pannel/JobTypes';
import Consultant from './Job_Pannel/Users/Consultant';
import JobSeeker from './Job_Pannel/Users/JobSeeker';
import AllUser from './Job_Pannel/Users/AllUser';


import ConsultantProfile from './Job_Pannel/Consultant/ConsultantProfile';
import TimeShadule from './Job_Pannel/Consultant/TimeShadule';
import ConsultantAppointments from './Job_Pannel/Consultant/ConsultantAppointment';

import AllAppointment from './Job_Pannel/Receiption/AllAppointment';
import ConsultantTimeShadule from './Job_Pannel/Receiption/ConsultantsTimeShadules';
import JobSeekerList from './Job_Pannel/Receiption/JobSeekerList';


import AppointmentReport from './Job_Pannel/Report/AppointmentReport';


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
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        
        {/* Use PrivateRoute for the protected route */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/appointment/consultationrequest" element={<PrivateRoute element={<ConsultationRequest />} />} />
        <Route path="/appointment/AppointmentList" element={<PrivateRoute element={<AppointmentList />} />} />
        <Route path="/appointment/FindConsultant" element={<PrivateRoute element={<FindConsultant />} />} />

        <Route path="/jobpannel" element={<PrivateRoute element={<Jobpannel />} />} />
        <Route path="/jobpannel/country" element={<PrivateRoute element={<Country />} />} />
        <Route path="/jobpannel/job-categories" element={<PrivateRoute element={<JobTypes />} />} />
        <Route path="/jobpannel/consultant" element={<PrivateRoute element={<Consultant />} />} />
        <Route path="/jobpannel/jobseekerlist" element={<PrivateRoute element={<JobSeeker />} />} />
        <Route path="/jobpannel/userlist" element={<PrivateRoute element={<AllUser />} />} />


        <Route path="/jobpannel/Receiption/AllAppointment" element={<PrivateRoute element={<AllAppointment />} />} />
        <Route path="/jobpannel/Receiption/ConsultantTimeShadule" element={<PrivateRoute element={<ConsultantTimeShadule />} />} />
        <Route path="/jobpannel/Receiption/JobSeekerList" element={<PrivateRoute element={<JobSeekerList />} />} />
        
        {/* Consultant */}
        <Route path="/jobpannel/timeshadule" element={<PrivateRoute element={<TimeShadule />} />} />
        <Route path="/jobpannel/consultantAppointments" element={<PrivateRoute element={<ConsultantAppointments />} />} />
        <Route path="/jobpannel/ConsultantProfile" element={<PrivateRoute element={<ConsultantProfile />} />} />

        <Route path="/jobpannel/AppointmentReport" element={<PrivateRoute element={<AppointmentReport />} />} />

        
      </Routes>
    </Router>
  );
}

export default App;
