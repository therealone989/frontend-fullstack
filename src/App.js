import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AddUser from './users/AddUser';
import AddTicket from './users/AddTicket';
import React, { useState, useEffect } from 'react';
import Login from './users/Login';
import Betreuer from './pages/Betreuer';
import DefaultNav from './layout/DefaultNav';
import BetreuerNav from './layout/BetreuerNav';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
    
  }, []);

  function renderRouteForRole() {
    if (!isLoggedIn) {
      return [
        <Route key="login" exact path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />,
        <Route key="adduser" path="/adduser" element={<AddUser />} />
      ];
    }
  
    if (userRole === "Lehrer") {
      return [
        <Route key="home" exact path="/" element={<Home />} />,
        <Route key="addticket" path="/addticket" element={<AddTicket />} />
      ];
    }
  
    if (userRole === "Betreuer") {
      return <Route key="betreuer" exact path="/" element={<Betreuer />} />;
    }
  
    return null;
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUserRole('');
    localStorage.clear();
  }

  function renderNavbar() {
    if (!isLoggedIn) {
      return <DefaultNav />;
    }
    if (userRole === "Lehrer") {
      return <Navbar onLogout={handleLogout}/>;
    }
    if (userRole === "Betreuer") {
      return <BetreuerNav onLogout={handleLogout} />;
    }
    return null;
  }



  return (
    <div className="App">
      <Router>
        {renderNavbar()}
        <Routes>
          {renderRouteForRole()}
          {/* Standardmäßig zugreifbar */}
          {/* Weitere Routen können hier hinzugefügt werden, falls benötigt */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
