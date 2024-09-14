import React, { useState, useEffect } from 'react';
import CustomerService from '../services/CustomerService';
import { useHistory, useParams } from 'react-router-dom';

function CustomerForm() {
  const [customer, setCustomer] = useState({
    customerName: '',
    email: '',
    phone: '',
  });

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (id) {
      CustomerService.getCustomerById(id).then((response) => {
        setCustomer(response.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      CustomerService.updateCustomer(id, customer).then(() => {
        history.push('/');
      });
    } else {
      CustomerService.createCustomer(customer).then(() => {
        history.push('/');
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="customerName"
          value={customer.customerName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Teléfono:</label>
        <input
          type="text"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
}

export default CustomerForm;
