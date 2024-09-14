import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    customerName: '',
    email: '',
    phone: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchCustomer(id);
    }
  }, [id]);

  const fetchCustomer = async (customerId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/customers/${customerId}`);
      setCustomer(response.data);
    } catch (error) {
      console.error('Error fetching customer:', error);
      setError('Error al cargar los datos del cliente: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = isEdit ? `http://localhost:8080/customers/${id}` : 'http://localhost:8080/customers';
      const method = isEdit ? 'put' : 'post';
      const response = await axios[method](url, customer);
      console.log('Response:', response);
      navigate('/customers', { state: { message: `Cliente ${isEdit ? 'editado' : 'creado'} con éxito` } });
    } catch (error) {
      console.error('Error saving customer:', error);
      setError('Error al guardar el cliente: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Nombre del Cliente</label>
          <input
            type="text"
            name="customerName"
            value={customer.customerName}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Teléfono</label>
          <input
            type="text"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {isEdit ? 'Guardar Cambios' : 'Crear Cliente'}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;