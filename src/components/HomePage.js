import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Gestión de Cine</h1>
        <div className="flex space-x-4">
          <Link to="/customers" className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg shadow-md transition duration-300">
            Clientes
          </Link>
          <Link to="/movies" className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg shadow-md transition duration-300">
            Películas
          </Link>
          <Link to="/reservations" className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-lg shadow-md transition duration-300">
            Reservaciones
          </Link>
          <Link to="/rooms" className="bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-lg shadow-md transition duration-300">
            Salas
          </Link>
          <Link to="/schedules" className="bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg shadow-md transition duration-300">
            Proyecciones
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;   