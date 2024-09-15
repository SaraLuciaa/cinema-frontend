import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ScreeningScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/schedules');
      setSchedules(response.data);
    } catch (error) {
      setError('Error al cargar las programaciones: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta programación?')) {
      try {
        await axios.delete(`http://localhost:8080/api/schedules/${id}`);
        setSchedules(schedules.filter(schedule => schedule.scheduleId !== id));
      } catch (error) {
        setError('Error al eliminar la programación: ' + (error.response?.data || error.message));
      }
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Programaciones</h2>
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}
      <Link to="/schedules/new" className="bg-green-500 text-white p-2 rounded mb-4 inline-block">Agregar Programación</Link>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Película</th>
            <th className="border p-2">Sala</th>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(schedule => (
            <tr key={schedule.scheduleId}>
              <td className="border p-2">{schedule.scheduleId}</td>
              <td className="border p-2">{schedule.movie.title}</td>
              <td className="border p-2">{schedule.room.roomNumber}</td>
              <td className="border p-2">{schedule.screeningDate}</td>
              <td className="border p-2">
                <button onClick={() => handleDelete(schedule.scheduleId)} className="bg-red-500 text-white p-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScreeningScheduleList;