import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Register() {
  const [userInfo, setUserInfo] = useState({
    FName: '',
    LName: '',
    NIC: '',
    DOB: '',
    Email: '',
    TelNo: '',
    Address: '',
    Password: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

 
  const handleSave = () => {
    const requiredFields = ['FName', 'LName', 'NIC', 'DOB', 'Email', 'TelNo', 'Address', 'Password', 'ConfirmPassword'];
    const errors = {};

    requiredFields.forEach((field) => {
      if (!userInfo[field]) {
        errors[field] = 'This field is required.';
      }
      
    });
    

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      Swal.fire({title: 'Warning', text: 'Something went wrong..!', icon: 'error' }).then((result) => {
        if (result.isConfirmed) {
          window.scrollTo({top: 0,behavior: 'smooth'});
        }
      });
      return;
    }

    const userName = `${userInfo.FName}${userInfo.LName}`;
    const data = {
      fName: userInfo.FName,
      lName: userInfo.LName,
      userName: userName,
      nic: userInfo.NIC,
      dob: userInfo.DOB,
      email: userInfo.Email,
      tel_No: userInfo.TelNo,
      address: userInfo.Address,
      password: userInfo.Password,
    };

    const url = 'https://localhost:7103/api/Registration/registration';
    axios.post(url, data).then((result) => {
        Swal.fire({title: 'Success', text: 'Registration Success..!', icon: 'success' }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login');
              window.scrollTo({top: 0,behavior: 'smooth'});
            }
          });
      })
      .catch((error) => {
        Swal.fire({title: 'Warning', text: 'Something went wrong..!', icon: 'error' }).then((result) => {
            if (result.isConfirmed) {
              window.scrollTo({top: 0,behavior: 'smooth'});
            }
          });
      });
  };

  return (
    <div className="background-image-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>User Registration Page</h4>
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group mb-3">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="FName"
                      value={userInfo.FName}
                      onChange={handleChange}
                      className="form-control"
                    />
                    <small className="text-danger">{validationErrors.FName}</small>
                  </div>

                  <div className="form-group mb-3">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="LName"
                      value={userInfo.LName}
                      onChange={handleChange}
                      className="form-control"
                    />
                    <small className="text-danger">{validationErrors.LName}</small>
                  </div>

                  <div className="form-group mb-3">
                    <label>NIC</label>
                    <input
                      type="text"
                      name="NIC"
                      value={userInfo.NIC}
                      onChange={handleChange}
                      className="form-control"
                    />
                    <small className="text-danger">{validationErrors.NIC}</small>
                  </div>

                  <div className="form-group mb-3">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="DOB"
                      value={userInfo.DOB}
                      onChange={handleChange}
                      className="form-control"
                    />
                    <small className="text-danger">{validationErrors.DOB}</small>
                  </div>

                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="Email"
                      value={userInfo.Email}
                      onChange={handleChange}
                      className="form-control"
                    />
                    <small className="text-danger">{validationErrors.Email}</small>
                  </div>

                  <div className="form-group mb-3">
                    <label>Phone Number</label>
                    <input
                      type="number"
                      name="TelNo"
                      value={userInfo.TelNo}
                      onChange={handleChange}
                      className="form-control"
                    />
                    <small className="text-danger">{validationErrors.TelNo}</small>
                  </div>

                  <div className="form-group mb-3">
                    <label>Address</label>
                    <input
                      type="text"
                      name="Address"
                      value={userInfo.Address}
                      onChange={handleChange}
                      className="form-control"
                    />
                    <small className="text-danger">{validationErrors.Address}</small>
                  </div>

                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      name="Password"
                      value={userInfo.Password}
                      onChange={handleChange}
                      className="form-control"
                    />
                    <small className="text-danger">{validationErrors.Password}</small>
                  </div>

                  <div className="form-group mb-3">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="ConfirmPassword"
                      value={userInfo.ConfirmPassword}
                      onChange={handleChange}
                      className="form-control"
                    />
                    <small className="text-danger">{validationErrors.Password}</small>
                  </div>

                  <div className="form-group mb-3">
                    <center>
                      <button type="button" onClick={handleSave} className="btn btn-primary">
                        <i className="bi bi-person-fill-add"></i> User Register
                      </button>
                    </center>
                  </div>

                  <div className="mt-3 text-center mt-4">
                  <Link to="/login" className="custome">
                    Sign In
                  </Link>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
