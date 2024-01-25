import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


export default function BetreuerNav({ onLogout }) {

    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout(); // Ruft die übergebene Logout-Funktion auf
        navigate('/'); // Navigiert zur Startseite
    };
  return (
    <nav className="nav navbar-dark bg-blue ">
  <Link className="nav-link" aria-current="page" to="/">Home</Link>
  <Link className="nav-link" to="/">Ticket Bearbeiten</Link>
  <button className="nav-link" onClick={handleLogoutClick}>Logout</button> {/* Logout-Button mit onClick-Handler */}
</nav>
  )
}
