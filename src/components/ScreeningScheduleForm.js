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

  const fetchSchedule = async (scheduleId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/schedules/${scheduleId}`);
      const scheduleData = response.data;
      setSchedule({
        movieId: scheduleData.movie.movieId,
        roomId: scheduleData.room.roomId,
        screeningDate: scheduleData.screeningDate.split('T')[0], // Formato 'YYYY-MM-DD'
        startTime: scheduleData.startTime.split('T')[1].slice(0, 5), // Formato 'HH:MM'
      });
    } catch (error) {
      setError('Error al cargar los datos de la programación: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = isEdit ? `http://localhost:8080/api/schedules/${id}` : 'http://localhost:8080/api/schedules';
      const method = isEdit ? 'put' : 'post';
      const response = await axios[method](url, {
        ...schedule,
        screeningDate: `${schedule.screeningDate}T${schedule.startTime}:00`, // Combina fecha y hora
      });
      navigate('/schedules', { state: { message: `Programación ${isEdit ? 'editada' : 'creada'} con éxito` } });
    } catch (error) {
      setError('Error al guardar la programación: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Editar Programación' : 'Agregar Programación'}</h2>
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Película</label>
          <select
            name="movieId"
            value={schedule.movieId}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Seleccione una película</option>
            {movies.map(movie => (
              <option key={movie.movieId} value={movie.movieId}>{movie.title}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Sala</label>
          <select
            name="roomId"
            value={schedule.roomId}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          >
            <option value="">Seleccione una sala</option>
            {rooms.map(room => (
              <option key={room.roomId} value={room.roomId}>{room.roomNumber}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Fecha de Proyección</label>
          <input
            type="date"
            name="screeningDate"
            value={schedule.screeningDate}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Hora de Inicio</label>
          <input
            type="time"
            name="startTime"
            value={schedule.startTime}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {isEdit ? 'Guardar Cambios' : 'Crear Programación'}
        </button>
      </form>
    </div>
  );
};

export default ScreeningScheduleForm;