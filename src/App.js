import './App.css';
import Registration from './Auth/Register';
import Login from './Auth/Login';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
