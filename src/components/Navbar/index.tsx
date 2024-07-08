import React from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox } from '@fortawesome/free-solid-svg-icons';
import './index.css';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaBars className="navbar-menu-icon" onClick={toggleSidebar} />
        <FontAwesomeIcon icon={faToolbox} className="navbar-logo-icon" />
        <div className="navbar-logo">Collect</div>
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="navbar-right">
        <FaUserCircle className="navbar-avatar" />
      </div>
    </nav>
  );
};

export default Navbar;
