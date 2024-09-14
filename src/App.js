import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import CustomerList from './components/CustomerList';
import HomePage from './components/HomePage';
// Importa tus futuros componentes para Reservaciones, Salas y Proyecciones
// import ReservationList from './components/ReservationList';
// import RoomList from './components/RoomList';
// import ProjectionList from './components/ProjectionList';

function App() {
  return (
    <div className="px-6 py-6">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/movies" element={<MovieList />} />
          {/* Aquí puedes añadir los componentes futuros */}
          {/* <Route path="/reservations" element={<ReservationList />} /> */}
          {/* <Route path="/rooms" element={<RoomList />} /> */}
          {/* <Route path="/projections" element={<ProjectionList />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;