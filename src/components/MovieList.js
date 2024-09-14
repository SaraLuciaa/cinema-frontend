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
      console.log(response.data); // Añade un console.log para verificar los datos
      setMovies(response.data);  // Verifica si cada película tiene un ID
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Error al cargar las películas: ' + (error.response?.data || error.message));
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      setError('No se pudo obtener el ID de la película para eliminarla');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/movies/${id}`);
      setMessage('Película eliminada con éxito');
      fetchMovies(); // Refetch movies after deletion
    } catch (error) {
      console.error('Error deleting movie:', error);
      setError('Error al eliminar la película: ' + (error.response?.data || error.message));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Películas</h2>
      
      {message && <div className="bg-green-100 text-green-800 p-2 mb-4">{message}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}

      <Link to="/movies/new" className="bg-blue-500 text-white p-2 rounded mb-4 inline-block">
        Agregar Película
      </Link>

      <ul className="space-y-2">
        {movies.length > 0 ? (
          movies.map(movie => (
            <li key={movie.movieId} className="border p-2 flex justify-between items-center">
              <span>{movie.title}</span>
              <div>
                <Link to={`/movies/edit/${movie.movieId}`} className="bg-yellow-500 text-white p-2 rounded mr-2">
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(movie.movieId)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No hay películas disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieList;