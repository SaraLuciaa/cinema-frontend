import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8080/rooms');
      setRooms(response.data);
    } catch (error) {
      setError('Error al cargar las habitaciones: ' + (error.response?.data || error.message));
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/rooms/${id}`);
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
            <th className="border px-4 py-2">Número de Habitación</th>
            <th className="border px-4 py-2">Capacidad</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map(room => (
              <tr key={room.roomId}>
                <td className="border px-4 py-2">{room.roomNumber}</td>
                <td className="border px-4 py-2">{room.capacity}</td>
                <td className="border px-4 py-2">
                  <Link to={`/rooms/edit/${room.roomId}`} className="bg-yellow-500 text-white p-2 rounded mr-2">Editar</Link>
                  <button onClick={() => handleDelete(room.roomId)} className="bg-red-500 text-white p-2 rounded">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3" className="text-center p-4">No hay habitaciones disponibles.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;