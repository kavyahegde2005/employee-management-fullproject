import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Myprofile from './components/Myprofile';
import Salary from './components/Salary';
import Employee from './components/Employee';
import History from './components/History';
import Admin from './components/Admin';
import Empdetails from './components/Empdetails';
import Idcard from './components/Idcard';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Navbar title="Employee Management System" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/myprofile" element={<Myprofile />} />
        <Route path="/salary" element={<Salary />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/empdetails/:id" element={<Empdetails />} />
        <Route path="/idcard/:id" element={<Idcard />} />

      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
