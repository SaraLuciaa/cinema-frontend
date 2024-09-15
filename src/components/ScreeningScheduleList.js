import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ScreeningScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [message, setMessage] = useState('');
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
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/schedules/${id}`);
      setMessage('Programación eliminada con éxito');
      fetchSchedules();
    } catch (error) {
      setError('Error al eliminar la programación: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Programaciones</h2>
      {message && <div className="bg-green-100 text-green-800 p-2 mb-4">{message}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}

      <Link to="/schedules/new" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">Agregar Programación</Link>

      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Película</th>
            <th className="border px-4 py-2">Sala</th>
            <th className="border px-4 py-2">Fecha de Proyección</th>
            <th className="border px-4 py-2">Hora de Inicio</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {schedules.length > 0 ? (
            schedules.map(schedule => (
              <tr key={schedule.scheduleId}>
                <td className="border px-4 py-2">{schedule.movieName}</td>
                <td className="border px-4 py-2">{schedule.roomNumber}</td>
                <td className="border px-4 py-2">{new Date(schedule.screeningDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{new Date(schedule.startTime).toLocaleTimeString()}</td>
                <td className="border px-4 py-2">
                  <Link to={`/schedules/edit/${schedule.scheduleId}`} className="bg-yellow-500 text-white p-2 rounded mr-2">Editar</Link>
                  <button onClick={() => handleDelete(schedule.scheduleId)} className="bg-red-500 text-white p-2 rounded">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5" className="text-center p-4">No hay programaciones disponibles.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ScreeningScheduleList;
