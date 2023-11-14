import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Project from './components/Project';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:id" component={Project} />
      </Routes>
    </Router>
  );
}

export default App;
