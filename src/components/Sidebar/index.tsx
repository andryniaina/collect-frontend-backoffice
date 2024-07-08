import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faFileAlt, faArchive } from '@fortawesome/free-solid-svg-icons';
import './index.css';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="sidebar-new-button">New</button>
      <ul className="sidebar-menu">
        <li className="sidebar-item">
          <Link to="/" className="sidebar-link">
            <FontAwesomeIcon icon={faRocket} className="sidebar-icon" />
            Deployed
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/draft" className="sidebar-link">
            <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" />
            Draft
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/archived" className="sidebar-link">
            <FontAwesomeIcon icon={faArchive} className="sidebar-icon" />
            Archived
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
