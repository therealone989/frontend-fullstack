import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function AddUser() {

    let navigate=useNavigate();


    // User JSON an Backend übergeben
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
        try {
            e.preventDefault();
            // Benutzer erstellen
            const response = await axios.post("http://localhost:8080/user", user);
            const userId = response.data.userId; // Angenommen, die ID wird hier zurückgegeben
            console.log(user);
            navigate("/");
            // Räume zuweisen
            if (userType === 'Betreuer' && selectedRooms.length > 0) {
                await assignRoomsToUser(userId, selectedRooms);
            }
    
            //navigate("/");
        } catch (error) {
            console.error('Fehler beim Erstellen des Benutzers', error);
        }
    }


    const assignRoomsToUser = async (userId, rooms) => {
        try {
            for (const roomId of rooms) {
                console.log('Zuweisung von Raum:', roomId, 'für User:', userId);
                await axios.post("http://localhost:8080/usedroom", {
                    user_in_room: userId,
                    room_used: roomId
                });
            }
        } catch (error) {
            console.error('Fehler beim Zuweisen der Räume', error);
        }
    };


    // Räume von Datenbank Getten
    const [rooms, setRooms] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [userType, setUserType] = useState('');

    useEffect(() => {
        // Laden der Raumdaten beim Initialisieren der Komponente
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await axios.get("http://localhost:8080/raums");
            setRooms(response.data); // Angenommen, response.data ist ein Array von Räumen
        } catch (error) {
            console.error('Fehler beim Abrufen der Raumdaten', error);
        }
    };

    const handleRoomCheck = (roomId) => {
        setSelectedRooms(prevSelectedRooms => {
            if (prevSelectedRooms.includes(roomId)) {
                return prevSelectedRooms.filter(id => id !== roomId);
            } else {
                return [...prevSelectedRooms, roomId];
            }
        });
    };

    const handleRoleChange = (e) => {
        // Aktualisieren Sie den userType für die Anzeige der Räume
        setUserType(e.target.value);
    
        // Aktualisieren Sie die Rolle im User-Objekt
        onInputChange(e);
    };

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
                    placeholder="Vorname eingeben"
                    name="vorname"
                    value={vorname}
                    onChange={(e)=>onInputChange(e)}
                    required
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
                    required
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
                    required
                    />
                </div>
                <div class="mb-3 text-start">
                    <label htmlFor="Passwort" className="form-label">Passwort</label>
                    <input
                    type="password"
                    className="form-control"
                    placeholder="Passwort eingeben"
                    name="passwort"
                    value={passwort}
                    onChange={(e)=>onInputChange(e)}
                    required
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
                        onChange={handleRoleChange}>
                        <option value="" disabled selected>
                        Rolle auswählen!
                        </option>
                        <option value="Betreuer">Betreuer</option>
                        <option value="Lehrer">Lehrer</option>
                    </select>

                    {/* Räume als checkbox auswählbar wenn man Betreuer wählt */}
                </div>
                {userType === 'Betreuer' && (
                    <div className="custom-grid col-md-12 border rounded p-4 mt-2 shadow">
                        <h4 className="">Räume</h4>
                        {rooms.map(room => (
                        <div className="col-md" key={room.raumId}> {/* Hier verwenden Sie room.id als Schlüssel */}
                            <input
                                type="checkbox"
                                id={`room-${room.raumId}`}
                                checked={selectedRooms.includes(room.raumId)}
                                onChange={() => handleRoomCheck(room.raumId)}
                            />
                            <label htmlFor={`room-${room.raumId}`}>{room.titel}</label>
                        </div>
                        ))}
                    </div>
                )}
                <button type="submit" className="btn btn-outline-primary">Registrieren</button>
                </form>
                
            </div>
        </div>
    </div>
  );

}
