import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReservationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState({
    customerId: '',
    screeningScheduleId: '',
    seatsReserved: ''
  });
  const [customers, setCustomers] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCustomers();
    fetchSchedules();
    if (id) {
      setIsEdit(true);
      fetchReservation(id);
    }
  }, [id]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/customers');
      setCustomers(response.data);
    } catch (error) {
      setError('Error al cargar los clientes: ' + (error.response?.data || error.message));
    }
  };

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/schedules');
      setSchedules(response.data);
    } catch (error) {
      setError('Error al cargar las proyecciones: ' + (error.response?.data || error.message));
    }
  };

  const fetchReservation = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/reservations/${id}`);
      const { customer, screeningSchedule, seatsReserved } = response.data;
      setReservation({
        customerId: customer.customerId,
        screeningScheduleId: screeningSchedule.scheduleId,
        seatsReserved: seatsReserved
      });
    } catch (error) {
      setError('Error al cargar la reservación: ' + (error.response?.data || error.message));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation(prevReservation => ({
      ...prevReservation,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const customer = customers.find(c => c.customerId === parseInt(reservation.customerId));
      const screeningSchedule = schedules.find(s => s.scheduleId === parseInt(reservation.screeningScheduleId));

      if (!customer || !screeningSchedule) {
        setError('Cliente o programación no válidos.');
        setLoading(false);
        return;
      }

      const payload = {
        customer: customer,
        screeningSchedule: screeningSchedule,
        seatsReserved: reservation.seatsReserved
      };

      await axios[isEdit ? 'put' : 'post'](`http://localhost:8080/reservations${isEdit ? `/${id}` : ''}`, payload);
      navigate('/reservations', { state: { message: `Reservación ${isEdit ? 'editada' : 'creada'} con éxito` } });
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Error desconocido';
      setError('Error al guardar la reservación: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Editar Reservación' : 'Agregar Reservación'}</h2>
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
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
              <option key={customer.customerId} value={customer.customerId}>{customer.customerName}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Proyección</label>
          <select
            name="screeningScheduleId"
            value={reservation.screeningScheduleId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Selecciona una proyección</option>
            {schedules.map(schedule => (
              <option key={schedule.scheduleId} value={schedule.scheduleId}>
                {`${schedule.movie.title} - ${new Date(schedule.screeningDate).toLocaleString()}`}
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