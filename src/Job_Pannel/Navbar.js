import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'jquery/dist/jquery.min.js'; 
import 'datatables.net-bs5/js/dataTables.bootstrap5.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2';


function Navbar() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 100,
    });
  }, []);

  const token = localStorage.getItem("token");
  const UserName = localStorage.getItem("UserName");
  const Permission = localStorage.getItem("Permission");

  useEffect(() => {
    if (token === null) {
      navigate('/');
    }
  }, [navigate]);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('UserName');
    localStorage.removeItem('Email');
    localStorage.removeItem('Permission');
    localStorage.removeItem('Status');
    navigate('/');
  }

  return (
 
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div className="container">
                <Link to="/jobpannel" className="navbar-brand">
                    eJob Consult
                </Link>
                <ul></ul>
                <ul></ul>
                <ul>

                </ul>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                {Permission == 2 ? (
                <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <a id="navbarDropdownConsultant" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Consultant
                                </a>

                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownConsultant">
                                    <Link to="/jobpannel/ConsultantProfile" className="dropdown-item">
                                        Consultant Profile
                                    </Link>
                                    <Link to="/jobpannel/timeshadule" className="dropdown-item">
                                        Consultant Availablity
                                    </Link>
                                    <Link to="/jobpannel/consultantAppointments" className="dropdown-item">
                                        Consultant Appointments
                                    </Link>
                                </div>
                            </li>
                            
                </ul>
            
                
                 ) : ('')}

                
                        <ul></ul>
                        {Permission == 4 ? (
                            <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <a id="navbarDropdownReports" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Receiption
                                </a>

                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownReports">
                                    <Link to="/jobpannel/Receiption/AllAppointment" className="dropdown-item">
                                        All Appointments
                                    </Link>
                                    <Link to="/jobpannel/Receiption/ConsultantTimeShadule" className="dropdown-item">
                                        Consultant Time Shadule
                                    </Link>
                                    <Link to="/jobpannel/Receiption/JobSeekerList" className="dropdown-item">
                                        Job Seeker List
                                    </Link>
                                </div>
                            </li>
                            
                        </ul>
                       ) : ('')}

                        <ul></ul>

                        {Permission == 4 || Permission == 1  ? (
                            <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <a id="navbarDropdownReports" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Reports
                                </a>

                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownReports">
                                    <Link to="/jobpannel/AppointmentReport" className="dropdown-item">
                                        Appointment Schedule Report
                                    </Link>
                                    
                                </div>
                            </li>
                            
                        </ul>
                     ) : ('')}

                        <ul></ul>

                        
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {Permission == 1  ? (
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <a id="addingDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Adding
                            </a>
    
                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="addingDropdown">
                                <Link to="/jobpannel/country" className="dropdown-item">
                                Country
                                </Link>
                                <Link to="/jobpannel/job-categories" className="dropdown-item">
                                Job Categories
                                </Link>
                            </div>
                        </li>
                        <ul></ul>
                        <li className="nav-item dropdown">
                            <a id="user_dataDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Users
                            </a>
    
                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="user_dataDropdown">
                                <Link to="/jobpannel/consultant" className="dropdown-item">
                                    Consultant
                                </Link>
                                <Link to="/jobpannel/jobseekerlist" className="dropdown-item">
                                    Job Seeker
                                </Link>
                                
                                <Link to="/jobpannel/userlist" className="dropdown-item">
                                    All Users
                                </Link>   
                            </div>
                        </li>
                    </ul>
                    ) : ('')}
                    
                    <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {UserName}
                                </a>

                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" onClick={logout}>
                                        Logout
                                    </a>

                                </div>
                            </li>
                    </ul>


                </div>


            </div>
        </nav>

        
  );
}

export default Navbar;
