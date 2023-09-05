import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <a id="addingDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Adding
                            </a>
    
                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="addingDropdown">
                                <Link to="/jobpannel/country" className="dropdown-item">
                                Country
                                </Link>
                                <Link to="/jobpannel/job-types" className="dropdown-item">
                                Job Types
                                </Link>
                            </div>
                        </li>

                        <li className="nav-item dropdown">
                            <a id="user_dataDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Users
                            </a>
    
                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="user_dataDropdown">
                                <a className="dropdown-item" href="#">
                                    All Users
                                </a>
    
                            </div>
                        </li>
                    </ul>

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
