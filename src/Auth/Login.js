import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (value) => {
        setEmail(value);
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
    };

    const handleLogin = () => {
        const data = {
            email: Email,
            password: Password
        };

        const url = 'https://localhost:7103/api/Login/login';
        
        axios.post(url, data)
            .then((result) => {
                const { token } = result.data;
                console.log(result.data);
                if (token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('id', result.data.id)
                    localStorage.setItem('UserName', result.data.userName)
                    localStorage.setItem('Email', result.data.email)
                    localStorage.setItem('Permission', result.data.permission)
                    localStorage.setItem('Status', result.data.status)
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    navigate('/home');
                } else {
                    alert('Login failed. No token received.');
                }
            })
            .catch((error) => {
                alert('Login failed. Please check your credentials.');
            });
    };



   return <div>
     <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>User Login Page</h4>
                            </div>
                            <div className="card-body">
                  
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="email" name="Email" onChange={(e) => handleEmailChange(e.target.value)}  className="form-control" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="Password" onChange={(e) => handlePasswordChange(e.target.value)}  className="form-control"/>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" onClick={() => handleLogin()} className="btn btn-primary">Login</button>
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
   </div>
}

export default Login;