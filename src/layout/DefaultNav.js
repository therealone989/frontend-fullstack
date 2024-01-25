import React from 'react'
import { Link } from 'react-router-dom'

export default function DefaultNav() {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  <span class="navbar-brand">Ticketsystem für Raumbetreuer</span>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
        <Link class="nav-link" to="/">Anmelden</Link>
        </li>
        <li class="nav-item">
        <Link className="nav-link" to="/adduser">Registrieren</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}
