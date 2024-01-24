import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AddUser from './users/AddUser';
import AddTicket from './users/AddTicket';
import Login from './users/Login';

function App() {
  return (<div className="App">
    <Router>
    <Navbar/>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/adduser" element={<AddUser/>}/>
      <Route exact path="/addticket" element={<AddTicket/>}/>
      <Route exact path="/login" element={<Login/>}/>
    </Routes>
    </Router>

    </div>
  );
}

export default App;
