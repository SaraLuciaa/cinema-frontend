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
      console.log(response.data); 
      setCustomers(response.data);  
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Error al cargar los clientes: ' + (error.response?.data || error.message));
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      setError('No se pudo obtener el ID del cliente para eliminarlo');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/customers/${id}`);
      setMessage('Cliente eliminado con éxito');
      fetchCustomers(); // Refetch customers after deletion
    } catch (error) {
      console.error('Error deleting customer:', error);
      setError('Error al eliminar el cliente: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
      
      {message && <div className="bg-green-100 text-green-800 p-2 mb-4">{message}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}

      <Link to="/customers/new" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">
        Agregar Cliente
      </Link>

      <ul className="space-y-2">
        {customers.length > 0 ? (
          customers.map(customer => (
            <li key={customer.customerId} className="border p-2 flex justify-between items-center">
              <span>{customer.customerName}</span>
              <div>
                <Link to={`/customers/edit/${customer.customerId}`} className="bg-yellow-500 text-white p-2 rounded mr-2">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(customer.customerId)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No hay clientes disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default CustomerList;