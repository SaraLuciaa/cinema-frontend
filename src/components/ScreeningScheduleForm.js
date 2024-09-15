import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ScreeningScheduleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState({
    movieId: '',
    roomId: '',
    screeningDate: '',
    startTime: '',
  });
  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMovies();
    fetchRooms();
    if (id) {
      setIsEdit(true);
      fetchSchedule(id);
    }
  }, [id]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/movies');
      setMovies(response.data);
    } catch (error) {
      setError('Error al cargar las películas: ' + (error.response?.data || error.message));
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8080/rooms');
      setRooms(response.data);
    } catch (error) {
      setError('Error al cargar las salas: ' + (error.response?.data || error.message));
    }
  };

  const fetchSchedule = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/schedules/${id}`);
      const { movie, room, screeningDate, startTime } = response.data;
      setSchedule({
        movieId: movie.movieId,
        roomId: room.roomId,
        screeningDate: new Date(screeningDate).toISOString().split('T')[0],
        startTime: new Date(startTime).toISOString().split('T')[1].substring(0, 5),
      });
    } catch (error) {
      setError('Error al cargar la programación: ' + (error.response?.data || error.message));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule(prevSchedule => ({
      ...prevSchedule,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const movie = movies.find(m => m.movieId === parseInt(schedule.movieId));
      const room = rooms.find(r => r.roomId === parseInt(schedule.roomId));
    
      const response = await axios[isEdit ? 'put' : 'post'](`http://localhost:8080/api/schedules${isEdit ? `/${id}` : ''}`, {
        movie: movie,
        room: room,
        screeningDate: schedule.screeningDate,
      });
  
      navigate('/schedules', { state: { message: `Programación ${isEdit ? 'editada' : 'creada'} con éxito` } });
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Error desconocido';
      setError('Error al guardar la programación: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };  
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Editar Programación' : 'Agregar Programación'}</h2>
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Película</label>
          <select
            name="movieId"
            value={schedule.movieId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Selecciona una película</option>
            {movies.map(movie => (
              <option key={movie.movieId} value={movie.movieId}>{movie.title}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Sala</label>
          <select
            name="roomId"
            value={schedule.roomId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Selecciona una sala</option>
            {rooms.map(room => (
              <option key={room.roomId} value={room.roomId}>{room.roomNumber}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha</label>
          <input
            type="datetime-local"
            name="screeningDate"
            value={schedule.screeningDate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
      
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </div>
  );
};

export default ScreeningScheduleForm;