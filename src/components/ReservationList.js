import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/reservations');
      setReservations(response.data);
    } catch (error) {
      setError('Error al cargar las reservas: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
      try {
        await axios.delete(`http://localhost:8080/reservations/${id}`);
        setReservations(reservations.filter(reservation => reservation.reservationId !== id));
      } catch (error) {
        setError('Error al eliminar la reserva: ' + (error.response?.data || error.message));
      }
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Reservas</h2>
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}
      <Link to="/reservations/new" className="bg-green-500 text-white p-2 rounded mb-4 inline-block">Agregar Reserva</Link>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Programación</th>
            <th className="border p-2">Cliente</th>
            <th className="border p-2">Asientos Reservados</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation.reservationId}>
              <td className="border p-2">{reservation.reservationId}</td>
              <td className="border p-2">{reservation.screeningSchedule.movie.title}</td>
              <td className="border p-2">{reservation.customer.customerName}</td>
              <td className="border p-2">{reservation.seatsReserved}</td>
              <td className="border p-2">
                <Link to={`/reservations/edit/${reservation.reservationId}`} className="bg-blue-500 text-white p-1 rounded mr-2">Editar</Link>
                <button onClick={() => handleDelete(reservation.reservationId)} className="bg-red-500 text-white p-1 rounded">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
