import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/rooms');
      setRooms(response.data);
    } catch (error) {
      setError('Error al cargar las habitaciones: ' + (error.response?.data || error.message));
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (roomId) => {
    try {
      await axios.delete(`http://localhost:8080/api/rooms/${roomId}`);
      setMessage('Habitación eliminada con éxito');
      fetchRooms();
    } catch (error) {
      setError('Error al eliminar la habitación: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Habitaciones</h2>
      {message && <div className="bg-green-100 text-green-800 p-2 mb-4">{message}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}

      <Link to="/rooms/new" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">Agregar Habitación</Link>

      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Room Number</th>
            <th className="border px-4 py-2">Capacity</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map(room => (
              <tr key={room.movieId}>
                <td className="border px-4 py-2">{room.roomId}</td>
                <td className="border px-4 py-2">{room.roomNumber}</td>
                <td className="border px-4 py-2">{room.capacity}</td>
                <td className="border px-4 py-2">
                  <Link to={`/movies/edit/${room.roomId}`} className="bg-yellow-500 text-white p-2 rounded mr-2">Editar</Link>
                  <button onClick={() => handleDelete(room.roomId)} className="bg-red-500 text-white p-2 rounded">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5" className="text-center p-4">No hay películas disponibles.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;