import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import Home from './components/Home/Home';
import ProjectDash from './components/Projects/Project_Dash';
import CustomNavbar from './components/Navbar';
import Projects from './components/Projects';
import Project from './components/Project';

function App() {
  return (
      <Router>
          <AuthProvider>
              <CustomNavbar />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
                <Route path="/project_dashboard" element={<ProjectDash />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<Project />} /> 
            </Routes>
          </AuthProvider>
      </Router>
  );
}

export default App;