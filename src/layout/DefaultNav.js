import React from 'react'
import { Link } from 'react-router-dom'

export default function DefaultNav() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
  <span className="navbar-brand">Ticketsystem für Raumbetreuer</span>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
        <Link className="nav-link" to="/">Anmelden</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/adduser">Registrieren</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}
