import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import RoomList from './components/RoomList';
import RoomForm from './components/RoomForm';
import ScreeningScheduleList from './components/ScreeningScheduleList';
import ScreeningScheduleForm from './components/ScreeningScheduleForm';
import ReservationList from './components/ReservationList';
import ReservationForm from './components/ReservationForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center p-8">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Gestión de Cine</h1>
          <div className="flex flex-wrap justify-center space-x-4 mb-8">
            <Link to="/customers" className="bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg shadow-md transition duration-300">
              Clientes
            </Link>
            <Link to="/movies" className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg shadow-md transition duration-300">
              Películas
            </Link>
            <Link to="/rooms" className="bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-lg shadow-md transition duration-300">
              Salas
            </Link>
            <Link to="/schedules" className="bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg shadow-md transition duration-300">
              Proyecciones
            </Link>
            <Link to="/reservations" className="bg-yellow-500 hover:bg-yellow-600 text-white py-4 px-6 rounded-lg shadow-md transition duration-300">
              Reservaciones
            </Link>         
          </div>
        </div>

        <div className="flex-grow max-w-4xl mx-auto">
          <Routes>            
            <Route path="/customers" element={<div className="p-4"><CustomerList /></div>} />
            <Route path="/customers/new" element={<div className="p-4"><CustomerForm /></div>} />
            <Route path="/customers/edit/:id" element={<div className="p-4"><CustomerForm /></div>} />
            
            <Route path="/movies" element={<div className="p-4"><MovieList /></div>} />
            <Route path="/movies/new" element={<div className="p-4"><MovieForm /></div>} />
            <Route path="/movies/edit/:id" element={<div className="p-4"><MovieForm /></div>} />
            
            <Route path="/rooms" element={<div className="p-4"><RoomList /></div>} />
            <Route path="/rooms/new" element={<div className="p-4"><RoomForm /></div>} />
            <Route path="/rooms/edit/:id" element={<div className="p-4"><RoomForm /></div>} />

            <Route path="/schedules" element={<div className="p-4"><ScreeningScheduleList /></div>} />
            <Route path="/schedules/new" element={<div className="p-4"><ScreeningScheduleForm /></div>} />

            <Route path="/reservations" element={<div className="p-4"><ReservationList /></div>} />
            <Route path="/reservations/new" element={<div className="p-4"><ReservationForm /></div>} />
            <Route path="/reservations/edit/:id" element={<div className="p-4"><ReservationForm /></div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;