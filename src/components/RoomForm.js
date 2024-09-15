import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RoomForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    roomNumber: '',
    capacity: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchRoom(id);
    }
  }, [id]);

  const fetchRoom = async (roomId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/rooms/${roomId}`);
      setRoom(response.data);
    } catch (error) {
      console.error('Error fetching room:', error);
      setError('Error al cargar los datos de la habitación: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = isEdit ? `http://localhost:8080/rooms/${id}` : 'http://localhost:8080/rooms';
      const method = isEdit ? 'put' : 'post';
      const response = await axios[method](url, room);
      console.log('Response:', response);
      navigate('/rooms', { state: { message: `Habitación ${isEdit ? 'editada' : 'creada'} con éxito` } });
    } catch (error) {
      console.error('Error saving room:', error);
      setError('Error al guardar la habitación: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Editar Habitación' : 'Agregar Habitación'}</h2>
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Número de Habitación</label>
          <input
            type="number"
            name="roomNumber"
            value={room.roomNumber}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Capacidad</label>
          <input
            type="number"
            name="capacity"
            value={room.capacity}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {isEdit ? 'Guardar Cambios' : 'Crear Habitación'}
        </button>
      </form>
    </div>
  );
};

export default RoomForm;