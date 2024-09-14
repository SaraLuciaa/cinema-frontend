import axios from 'axios';

const API_URL = 'http://localhost:8080/api/movies';

const getMovies = () => axios.get(API_URL);
const getMovieById = (id) => axios.get(`${API_URL}/${id}`);
const createMovie = (movie) => axios.post(API_URL, movie);
const updateMovie = (id, movie) => axios.put(`${API_URL}/${id}`, movie);
const deleteMovie = (id) => axios.delete(`${API_URL}/${id}`);

export { getMovies, getMovieById, createMovie, updateMovie, deleteMovie };