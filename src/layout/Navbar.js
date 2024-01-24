import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
<div>
<nav className="nav navbar-dark bg-blue ">
  <Link className="nav-link" aria-current="page" to="/">Home</Link>
  <Link className="nav-link" to="/adduser">Registrieren</Link>
  <Link className="nav-link" to="/addticket">Ticket Erstellen</Link>
  <Link className="nav-link" to="/login">Login</Link>
</nav>
</div>
  )
}
