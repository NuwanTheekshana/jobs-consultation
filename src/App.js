import './App.css';
import Welcome from './Welcome';
import Home from './Home';
import Login from './Auth/Login';
import Registration from './Auth/Register';
import PrivateRoute from './PrivateRoute'; 
import { BrowserRouter as Router, Route, Routes, Link, Navigate, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Use PrivateRoute for the protected route */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </Router>
  );
}

export default App;
