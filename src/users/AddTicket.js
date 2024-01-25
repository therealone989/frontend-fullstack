import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AddTicket() {

    function formatTime(date) {
        const pad = (num, size = 2) => num.toString().padStart(size, '0');
    
        let year = date.getFullYear();
        let month = pad(date.getMonth() + 1);
        let day = pad(date.getDate());
        let hours = pad(date.getHours());
        let minutes = pad(date.getMinutes());
        let seconds = pad(date.getSeconds());
        let milliseconds = pad(date.getMilliseconds(), 3);
    
        // Für die Zeitzone können wir UTC oder die lokale Zeitzone verwenden
        // UTC: 'Z'
        // Lokale Zeitzone: Hier wird ein einfaches Format verwendet, 
        // aber es wird nicht das exakte ISO 8601-Format sein
        let timeZoneOffset = -date.getTimezoneOffset();
        let timeZoneDifference = pad(Math.floor(Math.abs(timeZoneOffset) / 60)) + ':' + pad(Math.abs(timeZoneOffset) % 60);
        let timeZoneFormatted = (timeZoneOffset >= 0 ? '+' : '-') + timeZoneDifference;
    
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timeZoneFormatted}`;
    }
    console.log(formatTime(new Date()));
    var datetime = formatTime(new Date());
    

    let navigate=useNavigate();

    const [ticket,setTicket]=useState({
        lehrerID:1,
        raumID:1,
        status:"offen",
        zeit:datetime,
        raumbezeichnung:"",
        titel:"",
        problem:""
    });

    const{lehrerID,raumID,status,raumbezeichnung,titel,problem,}=ticket;

    const onInputChange=(e)=>{
        setTicket({...ticket,[e.target.name]:e.target.value})
    }

    const onSubmit= async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/ticket",ticket)
        navigate("/");
    }



  return (
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow">
                <h2 class="text-center m-4">Ticket Erstellen</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                <div class="mb-3 text-start">
                    <label htmlFor="Raumbezeichnung" className="form-label">Raumbezeichnung</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Raumbezeichnung Eingeben"
                    name="raumbezeichnung"
                    value={raumbezeichnung}
                    onChange={(e)=>onInputChange(e)}
                    required
                    />
                </div>
                <div class="mb-3 text-start">
                    <label htmlFor="Titel" className="form-label">Titel</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Titel"
                    name="titel"
                    value={titel}
                    onChange={(e)=>onInputChange(e)}
                    required
                    />
                </div>
                <div class="mb-3 text-start">
                    <label htmlFor="Problem" className="form-label">Beschreibung des Problems</label>
                    <textarea
                    type="text"
                    className="form-control"
                    placeholder="Problembeschreibung"
                    name="problem"
                    value={problem}
                    onChange={(e)=>onInputChange(e)}
                    required
                    />
                </div>
                <button type="submit" className="btn btn-outline-primary">Ticket erstellen</button>
                </form>
            </div>
        </div>
    </div>
  );
}
