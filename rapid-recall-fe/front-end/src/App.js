import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home/Home';
import ProjectDash from './components/Projects/Project_Dash';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Project from './components/Project';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<ProjectDash />} />
          //<Route path="/projects/:id" component={Project} /> // TODO: move route to project dashboard page
        </Routes>
        <Navbar />
      </Router>
  );
}

export default App;