import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

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
        let timeZoneOffset = -date.getTimezoneOffset();
        let timeZoneDifference = pad(Math.floor(Math.abs(timeZoneOffset) / 60)) + ':' + pad(Math.abs(timeZoneOffset) % 60);
        let timeZoneFormatted = (timeZoneOffset >= 0 ? '+' : '-') + timeZoneDifference;
    
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timeZoneFormatted}`;
    }
    console.log(formatTime(new Date()));
    var datetime = formatTime(new Date());
    

    let navigate=useNavigate();

    const [ticket,setTicket]=useState({
        lehrerID:localStorage.getItem("userId"),
        raumID:"",
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



    const [rooms, setRooms] = useState([]); // Zum Speichern der verfügbaren Räume

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://localhost:8080/raums");
                console.log(response.data);
                setRooms(response.data); // Speichert die Räume im State
            } catch (error) {
                console.error('Fehler beim Abrufen der Raumdaten', error);
            }
        };

        fetchRooms();
    }, []);

    const handleRoomSelection = (e) => {
        setTicket({ ...ticket, raumID: e.target.value });
    };

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-8 offset-md-2 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Ticket Erstellen</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3 text-start">
                <label htmlFor="RaumID" className="form-label">Raum</label>
                <select
                    className="form-control"
                    name="raumID"
                    value={ticket.raumID}
                    onChange={handleRoomSelection}
                    required
                    >
                    <option value="" disabled>Auswählen</option>
                    {rooms.map(room => (
                       
                        <option key={room.raumId} value={room.raumId}>
                            {room.titel}
                        </option>
                    ))}
                </select>
                </div>
                <div className="mb-3 text-start">
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
                <div className="mb-3 text-start">
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
