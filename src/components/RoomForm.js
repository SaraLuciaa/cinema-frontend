import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = () => {
        RoomService.getRooms().then((response) => {
            setRooms(response.data);
        }).catch(error => {
            console.error("Error fetching rooms:", error);
        });
    };

    const deleteRoom = (roomId) => {
        RoomService.deleteRoom(roomId).then(() => {
            loadRooms(); // Reload rooms after deletion
        }).catch(error => {
            console.error("Error deleting room:", error);
        });
    };

    return (
        <div>
            <h2>Room List</h2>
            <button onClick={() => navigate('/rooms/new')}>Add Room</button>
            <table>
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Capacity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room.roomId}>
                            <td>{room.roomNumber}</td>
                            <td>{room.capacity}</td>
                            <td>
                                <button onClick={() => navigate(`/rooms/edit/${room.roomId}`)}>Edit</button>
                                <button onClick={() => deleteRoom(room.roomId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoomList;
