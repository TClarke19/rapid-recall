import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home/Home';
import ProjectDash from './components/Projects/Project_Dash';
import Navbar from './components/Navbar';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<ProjectDash />} />
        </Routes>
        <Navbar />
      </Router>
  );
}

export default App;