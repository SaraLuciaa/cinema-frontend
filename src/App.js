import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
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
          {/* Página de inicio */}
          <Route path="/" element={<HomePage />} />
          
          {/* Rutas para clientes */}
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/customers/edit/:id" element={<CustomerForm />} />
          
          {/* Rutas para películas */}
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/new" element={<MovieForm />} />
          <Route path="/movies/edit/:id" element={<MovieForm />} />
          
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