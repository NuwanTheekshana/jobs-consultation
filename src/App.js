import './App.css';
import Registration from './Auth/Register';
import Login from './Auth/Login';
import Home from './Home';
import PrivateRoute from './PrivateRoute'; 
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Use PrivateRoute for the protected route */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </Router>
  );
}

export default App;
