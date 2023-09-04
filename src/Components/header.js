import React, { Component } from 'react';
import {Link} from 'react-router-dom';
 
class Header extends Component {
    render() {
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
                  {/* <li className="dropdown has-dropdown"><a href="#"><span>Dropdown</span> <i className="bi bi-chevron-down"></i></a>
                    <ul className="dd-box-shadow">
                      <li><a href="#">Dropdown 1</a></li>
                      <li className="dropdown has-dropdown"><a href="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down"></i></a>
                        <ul className="dd-box-shadow">
                          <li><a href="#">Deep Dropdown 1</a></li>
                          <li><a href="#">Deep Dropdown 2</a></li>
                          <li><a href="#">Deep Dropdown 3</a></li>
                          <li><a href="#">Deep Dropdown 4</a></li>
                          <li><a href="#">Deep Dropdown 5</a></li>
                        </ul>
                      </li>
                      <li><a href="#">Dropdown 2</a></li>
                      <li><a href="#">Dropdown 3</a></li>
                      <li><a href="#">Dropdown 4</a></li>
                    </ul>
                  </li> */}
                  <li><a href="index.html#contact">Contact</a></li>
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
                </ul>
        
                <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
              </nav>
        
              {/* <a className="btn-getstarted" href="index.html#about">Sign In</a> */}
          
        
            </div>
          </header>
        );
    }
}
export default Header;