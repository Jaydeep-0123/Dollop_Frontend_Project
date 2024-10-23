import React, { useState } from 'react';
import '../assets/styles/Sidebar.css';
import {Link} from 'react-router-dom'
import { FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle button */}
      <button 
        className="toggle-btn btn primary position-absolute" style={{zIndex:"10"}}
        id='toggler'

        onClick={toggleSidebar}
      >
        { <FaBars />}
      </button>

      {/* Sidebar */}
      <div className={`overflow-hidden sidebar d-flex flex-column p-3 ${isOpen ? 'open' : ''}`}>
      <div className='text-end d-flex justify-content-end'>
        <button 
          className="toggle-btn btn primary bg-transparent text-white "
          id='toggler'
          onClick={toggleSidebar}
        >
          {'X'}
        </button>
      </div>
        <div className="logo-section">
          <h2 className="text-white">Candidate</h2>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white m-2" to="/dashBoard">
              <i className="bi-speedometer2"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white m-2" to="/quiz">
              <i className="bi bi-bullseye"></i> Quiz
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white m-2" href="#" id="manage">
              <i className="bi bi-calendar" ></i> Tasks / Calendar
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white m-2" id="manage" to="/emailFuncationality">
              <i className="bi bi-envelope" ></i> Email Functionality
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white m-2" to="/showUser">
              <i className="bi bi-door-open"></i> 
              Show User
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white m-2" to="/coordinate">
              <i className="bi bi-chat-left-text"></i> Cordinator
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white m-2" to="/mock_test">
              <i className="bi bi-geo"></i> Mock Test
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white m-2" to="/home">
              <i className="bi bi-person"></i> User
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
