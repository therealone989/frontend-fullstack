import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout(); // Ruft die übergebene Logout-Funktion auf
        navigate('/'); // Navigiert zur Startseite
    };
  return (
<div>
<nav className="nav navbar-dark bg-blue ">
  <Link className="nav-link" aria-current="page" to="/">Homey</Link>
  <Link className="nav-link" to="/adduser">Registrieren</Link>
  <Link className="nav-link" to="/addticket">Ticket Erstellen</Link>
  <Link className="nav-link" to="/login">Login</Link>
  <button onClick={handleLogoutClick}>Logout</button> {/* Logout-Button mit onClick-Handler */}

</nav>
</div>
  )
}
