import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReservationForm = () => {
  const { id } = useParams(); // Para obtener el id de la reserva en caso de editar
  const navigate = useNavigate();
  const [reservation, setReservation] = useState({
    screeningScheduleId: '',
    customerId: '',
    seatsReserved: '',
  });
  const [schedules, setSchedules] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSchedules();
    fetchCustomers();
    if (id) {
      setIsEdit(true);
      fetchReservation(id);
    }
  }, [id]);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/schedules');
      setSchedules(response.data);
    } catch (error) {
      setError('Error al cargar las programaciones: ' + (error.response?.data || error.message));
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/customers');
      setCustomers(response.data);
    } catch (error) {
      setError('Error al cargar los clientes: ' + (error.response?.data || error.message));
    }
  };

  const fetchReservation = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/reservations/${id}`);
      const { screeningSchedule, customer, seatsReserved } = response.data;
      setReservation({
        screeningScheduleId: screeningSchedule.screeningScheduleId,
        customerId: customer.customerId,
        seatsReserved,
      });
    } catch (error) {
      setError('Error al cargar la reserva: ' + (error.response?.data || error.message));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation(prevReservation => ({
      ...prevReservation,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const reservationPayload = {
        customerId: reservation.customerId,
        screeningScheduleId: reservation.screeningScheduleId,
        seatsReserved: reservation.seatsReserved,
      };
      console.log('Enviando payload de reserva:', reservationPayload);
      const response = await axios[isEdit ? 'put' : 'post'](
        `http://localhost:8080/reservations${isEdit ? `/${id}` : ''}`,
        reservationPayload
      );
      navigate('/reservations', { state: { message: `Reserva ${isEdit ? 'editada' : 'creada'} con éxito` } });
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Error desconocido';
      setError('Error al guardar la reserva: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };    

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Editar Reserva' : 'Agregar Reserva'}</h2>
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Programación</label>
          <select
            name="screeningScheduleId"
            value={reservation.screeningScheduleId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Selecciona una programación</option>
            {schedules.map(schedule => (
              <option key={schedule.screeningScheduleId} value={schedule.screeningScheduleId}>
                {schedule.movie.title} - {schedule.room.roomNumber} - {schedule.screeningDate}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cliente</label>
          <select
            name="customerId"
            value={reservation.customerId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Selecciona un cliente</option>
            {customers.map(customer => (
              <option key={customer.customerId} value={customer.customerId}>
                {customer.customerName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Asientos Reservados</label>
          <input
            type="number"
            name="seatsReserved"
            value={reservation.seatsReserved}
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

export default ReservationForm;