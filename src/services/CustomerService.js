export default new CustomerService();

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/customers';

const getMovies = () => axios.get(API_URL);
const getMovieById = (id) => axios.get(`${API_URL}/${id}`);
const createMovie = (movie) => axios.post(API_URL, customer);
const updateMovie = (id, movie) => axios.put(`${API_URL}/${id}`, customer);
const deleteMovie = (id) => axios.delete(`${API_URL}/${id}`);

export { getCustomers, getCustomerById, createCustomer, updatecustomer, deleteCustomer};