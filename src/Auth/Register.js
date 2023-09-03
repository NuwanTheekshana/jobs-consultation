import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [FName, setFName] = useState('');
    const [LName, setLName] = useState('');
    const [NIC, setNIC] = useState('');
    const [DOB, setDOB] = useState('');
    const [Email, setEmail] = useState('');
    const [TelNo, setTelNo] = useState('');
    const [Address, setAddress] = useState('');
    const [Password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleFNameChange = (value) => {
        setFName(value);
    };
    const handleLNameChange = (value) => {
        setLName(value);
    };
    const handleNICChange = (value) => {
        setNIC(value);
    };
    const handleDOBChange = (value) => {
        setDOB(value);
    };
    const handleEmailChange = (value) => {
        setEmail(value);
    };
    const handleTelNoChange = (value) => {
        setTelNo(value);
    };
    const handleAddressChange = (value) => {
        setAddress(value);
    };
    const handlePasswordChange = (value) => {
        setPassword(value);
    };

    const handleSave = () => {
        const userName = `${FName}${LName}`;
        const data = {
            fName: FName,
            lName: LName,
            userName: userName,
            nic: NIC,
            dob: DOB,
            email: Email,
            tel_No: TelNo,
            address: Address,
            password: Password
        }

        const url = 'https://localhost:7103/api/Registration/registration';
        axios.post(url, data)
            .then((result) => {
                alert(result.data);
                navigate('/login'); // Use navigate function to navigate to '/login' route
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <div>
            
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>User Registration Page</h4>
                            </div>
                            <div className="card-body">
                                    <div className="form-group mb-3">
                                        <label>First Name</label>
                                        <input type="text" name="FName" onChange={(e) => handleFNameChange(e.target.value)} className="form-control"/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Last Name</label>
                                        <input type="text" name="LName" onChange={(e) => handleLNameChange(e.target.value)} className="form-control"/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>NIC</label>
                                        <input type="text" name="NIC" onChange={(e) => handleNICChange(e.target.value)} className="form-control"/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Date of Birth</label>
                                        <input type="date" name="DOB" onChange={(e) => handleDOBChange(e.target.value)} className="form-control"/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="email" name="Email" onChange={(e) => handleEmailChange(e.target.value)}  className="form-control" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Phone Number</label>
                                        <input type="number" name="TelNo" onChange={(e) => handleTelNoChange(e.target.value)}  className="form-control" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Address</label>
                                        <input type="text" name="address" onChange={(e) => handleAddressChange(e.target.value)}  className="form-control" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="Password" onChange={(e) => handlePasswordChange(e.target.value)}  className="form-control"/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" onClick={() => handleSave()} className="btn btn-primary">User Register</button>
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        
    );
}

export default Register;