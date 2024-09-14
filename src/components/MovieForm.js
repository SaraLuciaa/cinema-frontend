import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    duration: '',
    releaseDate: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetchMovie(id);
    }
  }, [id]);

  const fetchMovie = async (movieId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/movies/${movieId}`);
      const movieData = response.data;
      // Ensure the date is in the correct format for the input
      movieData.releaseDate = movieData.releaseDate ? movieData.releaseDate.split('T')[0] : '';
      setMovie(movieData);
    } catch (error) {
      console.error('Error fetching movie:', error);
      setError('Error al cargar los datos de la película: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = isEdit ? `http://localhost:8080/api/movies/${id}` : 'http://localhost:8080/api/movies';
      const method = isEdit ? 'put' : 'post';
      const response = await axios[method](url, movie);
      console.log('Response:', response);
      navigate('/movies', { state: { message: `Película ${isEdit ? 'editada' : 'creada'} con éxito` } });
    } catch (error) {
      console.error('Error saving movie:', error);
      setError('Error al guardar la película: ' + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{isEdit ? 'Editar Película' : 'Agregar Película'}</h2>
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Título</label>
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Director</label>
          <input
            type="text"
            name="director"
            value={movie.director}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Duración (minutos)</label>
          <input
            type="number"
            name="duration"
            value={movie.duration}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Fecha de Estreno</label>
          <input
            type="date"
            name="releaseDate"
            value={movie.releaseDate}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={loading}>
          {isEdit ? 'Guardar Cambios' : 'Crear Película'}
        </button>
      </form>
    </div>
  );
};

export default MovieForm;