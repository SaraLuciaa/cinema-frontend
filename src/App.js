import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Gestión de Películas</h1>
        
        <Routes>
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/new" element={<MovieForm />} />
          <Route path="/movies/edit/:id" element={<MovieForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;