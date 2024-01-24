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
            console.log(response.data); // Enthält User-ID und Rolle
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userRole", response.data.rolle);
            setIsLoggedIn(true); // Aktualisieren Sie den Zustand in der App-Komponente
            setUserRole(response.data.rolle); // Aktualisieren Sie den Zustand in der App-Komponente
            navigate('/'); // Navigieren Sie zur Startseite
            console.log('Login erfolgreich!');
            // Weiterleitung oder andere Aktionen
            // Hier können Sie die Weiterleitung implementieren, z.B. mit react-router
            // navigate('/dashboard');
        } catch (error) {
            // Fehlerbehandlung
            console.error("Fehler bei der Anmeldung", error);
        }
    };

  return (
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow">
                <h2 class="text-center m-4">Anmelden</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                <div class="mb-3 text-start">
                    <label htmlFor="Email" className="form-label">E-Mail</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <div class="mb-3 text-start">
                    <label htmlFor="Passwort" className="form-label">Passwort</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Passwort"
                    name="passwort"
                    value={passwort}
                    onChange={(e)=>onInputChange(e)}
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
