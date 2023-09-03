import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken === null) {
      navigate('/login');
    } else {
      setToken(storedToken);
      setUserName(localStorage.getItem("UserName"));
      setEmail(localStorage.getItem("Email"));
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
    navigate('/login');
  }

  return (
    <div>
      Home <br></br>
      Welcome {username}
      <br></br>
      {Email}
      <br></br>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;
