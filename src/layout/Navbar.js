import React from 'react'

export default function Navbar() {
  return (
<div>
<nav className="nav navbar-dark bg-blue ">
  <a className="nav-link active" aria-current="page" href="#">Active</a>
  <a className="nav-link" href="#">Link</a>
  <a className="nav-link" href="#">Link</a>
  <a className="nav-link disabled" aria-disabled="true">Disabled</a>
</nav>
</div>
  )
}
