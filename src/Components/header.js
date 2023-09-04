import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Header() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 100,
    });
  }, []);

  const token = localStorage.getItem("token");

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
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <a href="index.html" className="logo d-flex align-items-center me-auto me-xl-0">
          <img src="assets/img/logo.png" alt="" />
          <h1>eJob Consult</h1>
        </a>
        <nav id="navmenu" className="navmenu">
          <ul>
            <li><a href="index.html#hero" className="active">Home</a></li>
            <li><a href="index.html#about">About</a></li>
            <li><a href="index.html#services">Services</a></li>
            <li><a href="index.html#contact">Contact</a></li>

            {token ? (
              <>
                <li>
                  <Link to="/login">
                    <button className="btn btn-danger"><i className="bi bi-box-arrow-right"></i> Job Panel</button>
                  </Link>
                </li>
                <li>
                  <button className="btn btn-danger" onClick={logout}><i className="bi bi-box-arrow-right"></i> Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <button className="btn btn-danger"><i className="bi bi-person-fill-lock"></i> Sign In</button>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <button className="btn btn-danger"><i className="bi bi-person-fill-add"></i> Sign Up</button>
                  </Link>
                </li>
              </>
            )}

          </ul>

          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
      </div>
    </header>
  );
}

export default Header;
