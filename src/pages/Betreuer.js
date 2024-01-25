import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Betreuer() {
    const [tickets, setTickets] = useState([]);
    const [usedRooms, setUsedRooms] = useState([]);
    const [rooms, setRooms] = useState([]);

    // Benutzer-ID aus dem LocalStorage abrufen
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ticketsResponse = await axios.get('http://localhost:8080/tickets');
                setTickets(ticketsResponse.data);

                const roomsResponse = await axios.get("http://localhost:8080/raums");
                setRooms(roomsResponse.data);

                const usedRoomsResponse = await axios.get('http://localhost:8080/usedrooms');
                setUsedRooms(usedRoomsResponse.data);

            } catch (error) {
                console.error('Fehler beim Abrufen der Daten', error);
            }
        };

        fetchData();
    }, []);

    const getRoomTitleById = (roomId) => {
      const room = rooms.find(r => r.raumId === roomId);
      return room ? room.titel : 'Unbekannter Raum';
  };

    // Filtern der Used Rooms basierend auf der Benutzer-ID
    const filteredUsedRooms = usedRooms.filter(room => room.user_in_room.toString() === userId);

    // Filter und Zusammenführen der Daten
    const filteredData = filteredUsedRooms.map(room => {
        return {
            ...room,
            tickets: tickets.filter(ticket => ticket.raumID === room.room_used)
        };
    });

    return (
        <div className='container'>
            <div className="py-4">
                <table className="table table-border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Raum ID</th>
                            <th scope="col">Ticket Titel</th>
                            <th scope="col">Beschreibung</th>
                            <th scope="col">Erstellungsdatum</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((data, index) => (
                            data.tickets.map((ticket, ticketIndex) => (
                                <tr key={ticket.id}>
                                    <th scope="row">{index + 1}.{ticketIndex + 1}</th>
                                    <td>{getRoomTitleById(ticket.raumID)}</td>
                                    <td>{ticket.titel}</td>
                                    <td>{ticket.problem}</td>
                                    <td>{ticket.zeit}</td>
                                    <td>{ticket.status}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
