import React from 'react';
import { Link } from 'react-router-dom';
import "./navigation.css"


const Navigation = () => {
  return (
    <div className="nav-cont">

      <nav className="navbar">
        <ul className="nav-l">
          <li className="nav-item">
            <Link to="/position">Position Data</Link>
          </li>
          <li className="nav-item">
            <Link to="/lap-telemetry">Lap Telemetry</Link>
          </li>
          <li className="nav-item">
            <Link to="/wdc-standings">WDC Standings</Link>
          </li>
          
          {/* Add more <li> elements for additional tabs */}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
