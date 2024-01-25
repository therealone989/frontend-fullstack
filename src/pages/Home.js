import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {


    const [tickets, setTickets] = useState([]); // State für Tickets
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRoomsAndTickets = async () => {
            try {
                const roomsResponse = await axios.get("http://localhost:8080/raums");
                setRooms(roomsResponse.data);

                const ticketsResponse = await axios.get("http://localhost:8080/tickets");
                setTickets(ticketsResponse.data);
            } catch (error) {
                console.error('Fehler beim Abrufen der Daten', error);
            }
        };

        fetchRoomsAndTickets();
    }, []);

    const getRoomTitleById = (roomId) => {
        const room = rooms.find(r => r.raumId === roomId);
        return room ? room.titel : 'Unbekannter Raum';
    };
    


  return (
    <div className='container'>
        <div className="py-4">
        <table className="table table-border shadow">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Raum</th>
                <th scope="col">Titel</th>
                <th scope="col">Beschreibung</th>
                <th scope="col">Erstellungsdatum</th>
                <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>

                {
                    tickets.map((ticket, index) => (
                        <tr key={ticket.id}> {/* Achten Sie auf die eindeutige key-Prop */}
                            <th scope="row">{index + 1}</th>
                            <td>{getRoomTitleById(ticket.raumID)}</td> {/* Felder entsprechend Ihren Daten anpassen */}
                            <td>{ticket.titel}</td>
                            <td>{ticket.problem}</td>
                            <td>{ticket.zeit}</td> {/* Formatieren Sie ggf. das Datum */}
                            <td>{ticket.status}</td>
                            <td>
                                {/* Schaltflächenaktionen entsprechend anpassen */}
                                <button className="btn btn-primary mx-2">View</button>
                                <button className="btn btn-outline-primary mx-2">Edit</button>
                                <button className="btn btn-danger mx-2">Delete</button>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
            </table>
        </div>
    </div>
  )
}
