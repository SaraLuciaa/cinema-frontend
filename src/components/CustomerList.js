import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/customers');
      setCustomers(response.data);
    } catch (error) {
      setError('Error al cargar los clientes: ' + (error.response?.data || error.message));
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/customers/${id}`);
      setMessage('Cliente eliminado con éxito');
      fetchCustomers();
    } catch (error) {
      setError('Error al eliminar el cliente: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
      {message && <div className="bg-green-100 text-green-800 p-2 mb-4">{message}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}

      <Link to="/customers/new" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">Agregar Cliente</Link>

      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map(customer => (
              <tr key={customer.customerId}>
                <td className="border px-4 py-2">{customer.customerName}</td>
                <td className="border px-4 py-2">{customer.email}</td>
                <td className="border px-4 py-2">{customer.phone}</td>
                <td className="border px-4 py-2">
                  <Link to={`/customers/edit/${customer.customerId}`} className="bg-yellow-500 text-white p-2 rounded mr-2">Editar</Link>
                  <button onClick={() => handleDelete(customer.customerId)} className="bg-red-500 text-white p-2 rounded">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4" className="text-center p-4">No hay clientes disponibles.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;