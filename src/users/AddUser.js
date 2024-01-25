import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddUser() {

    let navigate=useNavigate();

    const [user,setUser]=useState({
        vorname:"",
        nachname:"",
        email:"",
        passwort:"",
        rolle:""
    });

    const{vorname,nachname,email,passwort,rolle}=user;

    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const onSubmit= async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/user",user)
        navigate("/")
    }

  return (
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow">
                <h2 class="text-center m-4">Benutzer Registrieren</h2>

                <form onSubmit={(e) => onSubmit(e)}>
                <div class="mb-3 text-start">
                    <label htmlFor="Vorname" className="form-label">Vorname</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Nachname Eingeben"
                    name="vorname"
                    value={vorname}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <div class="mb-3 text-start">
                    <label htmlFor="Nachname" className="form-label">Nachname</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Nachname Eingeben"
                    name="nachname"
                    value={nachname}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <div class="mb-3 text-start">
                    <label htmlFor="Email" className="form-label">Email</label>
                    <input
                    type="email"
                    className="form-control"
                    placeholder="Email Eingeben"
                    name="email"
                    value={email}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <div class="mb-3 text-start">
                    <label htmlFor="Passwort" className="form-label">Passwort</label>
                    <input
                    type="password"
                    className="form-control"
                    placeholder="Nachname Eingeben"
                    name="passwort"
                    value={passwort}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <div className="mb-3 text-start">
                    <label htmlFor="Rolle" className="form-label font-weight-bold">
                        Rolle
                    </label>
                    <select
                        className="form-control"
                        name="rolle"
                        value={rolle}
                        onChange={(e) => onInputChange(e)}>
                        <option value="" disabled selected>
                        Rolle auswählen
                        </option>
                        <option value="Betreuer">Betreuer</option>
                        <option value="Lehrer">Lehrer</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-outline-primary">Registrieren</button>
                </form>
            </div>
        </div>
    </div>
  );

}
