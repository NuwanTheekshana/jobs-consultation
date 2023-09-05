import './App.css';
import Welcome from './Welcome';
import Login from './Auth/Login';
import Registration from './Auth/Register';

import Home from './Home';
import Jobpannel from './Job_Pannel/JobPannel';
import Country from './Job_Pannel/Country';
import JobTypes from './Job_Pannel/JobTypes';

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
        <Route path="/jobpannel/job-types" element={<PrivateRoute element={<JobTypes />} />} />
      </Routes>
    </Router>
  );
}

export default App;
