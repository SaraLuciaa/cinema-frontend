import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Cambia esto a la URL de tu backend

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;