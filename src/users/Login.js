import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login({ setIsLoggedIn, setUserRole }) {

    //Login
    let navigate=useNavigate();

    const [user,setUser]=useState({
        user_id:"",
        email:"",
        passwort:"",
        rolle:""
    });

    const{user_id,email,passwort,rolle}=user;

    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const onSubmit= async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/login", { email, passwort });
            console.log(response.data); // User-ID und Rolle
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userRole", response.data.rolle);
            setIsLoggedIn(true); // Aktualisieren App-Komponente
            setUserRole(response.data.rolle); // Aktualisieren App-Komponente
            navigate('/'); // (Neuladen)
            console.log('Login erfolgreich!');
        } catch (error) {
            // Fehlerbehandlung
            console.error("Fehler bei der Anmeldung", error);
        }
    };

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Anmelden</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3 text-start">
                    <label htmlFor="Email" className="form-label">E-Mail</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e)=>onInputChange(e)}
                    required
                    />
                </div>
                <div className="mb-3 text-start">
                    <label htmlFor="Passwort" className="form-label">Passwort</label>
                    <input
                    type="password"
                    className="form-control"
                    placeholder="Passwort"
                    name="passwort"
                    value={passwort}
                    onChange={(e)=>onInputChange(e)}
                    required
                    />
                </div>
                <button type="submit" className="btn btn-outline-primary m-4">Anmelden</button>
                
                </form>
                <Link className="nav-link" to="/adduser">Registrieren</Link>
            </div>
        </div>
    </div>

  )
}
