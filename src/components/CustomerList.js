import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';
import { Link } from 'react-router-dom';

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    CustomerService.getCustomers().then((response) => {
      setCustomers(response.data);
    });
  };

  const deleteCustomer = (id) => {
    CustomerService.deleteCustomer(id).then(() => {
      fetchCustomers();
    });
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <Link to="/add">Agregar Cliente</Link>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.customerName} - {customer.email}
            <Link to={`/edit/${customer.id}`}>Editar</Link>
            <button onClick={() => deleteCustomer(customer.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerList;