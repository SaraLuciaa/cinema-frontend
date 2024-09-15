import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/movies');
      setMovies(response.data);
    } catch (error) {
      setError('Error al cargar las películas: ' + (error.response?.data || error.message));
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/movies/${id}`);
      setMessage('Película eliminada con éxito');
      fetchMovies();
    } catch (error) {
      setError('Error al eliminar la película: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Películas</h2>
      {message && <div className="bg-green-100 text-green-800 p-2 mb-4">{message}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}

      <Link to="/movies/new" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">Agregar Película</Link>

      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Director</th>
            <th className="border px-4 py-2">Duration</th>
            <th className="border px-4 py-2">Release Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.length > 0 ? (
            movies.map(movie => (
              <tr key={movie.movieId}>
                <td className="border px-4 py-2">{movie.title}</td>
                <td className="border px-4 py-2">{movie.director}</td>
                <td className="border px-4 py-2">{movie.duration} minutes</td>
                <td className="border px-4 py-2">{movie.releaseDate}</td>
                <td className="border px-4 py-2">
                  <Link to={`/movies/edit/${movie.movieId}`} className="bg-yellow-500 text-white p-2 rounded mr-2">Editar</Link>
                  <button onClick={() => handleDelete(movie.movieId)} className="bg-red-500 text-white p-2 rounded">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5" className="text-center p-4">No hay películas disponibles.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;