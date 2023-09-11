import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';

function JobPannel() {
  const UserName = localStorage.getItem("UserName");

  return (
    
    <div>
        <Navbar />

       <br></br>
       <br></br>
       <br></br>
        <center>
        <img src="../assets/img/welcome.avif" style={{ maxWidth: '2500px', maxHeight: '2500px' }}/> <br></br>
        <Link to="/">
        <button className="btn btn-success"><i className="bi bi-house-door-fill"></i> Go to Home Page</button>
        </Link>
        
        </center>

       
    </div>
  );
}

export default JobPannel;
