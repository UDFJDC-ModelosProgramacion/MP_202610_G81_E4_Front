import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { TrialStay } from './pages/TrialStay/TrialStay'
import { Shelter } from './pages/Shelter/Shelter'
import { ShelterDetail } from './pages/ShelterDetail/ShelterDetail'
import { AdoptionRequest } from './pages/AdoptionRequest/AdoptionRequest'
import { Register } from './pages/Register/Register'
import { Review } from './pages/Review/Review'
import { ManageRequests } from './pages/ManageRequest/ManageRequests'
import { PetRegister } from './pages/PetRegister/PetRegister'
import { Login } from './pages/Login/Login'
import './App.css'
import { SuperviseRequests } from './pages/SuperviseRequests/SuperviseRequests'

function AppContent() {
  const location = useLocation();
  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/' || location.pathname === '/register';

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* Habilitamos la ruta para la página de Registro */}
        <Route path="/register" element={<Register />} />
        {/* Si no coincide con ninguna, vuelve al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <main style={{
        flex: 1,
        marginLeft: '150px',
        padding: '20px',
        backgroundColor: '#fce7f3',
        minHeight: '100vh'
      }}>
        <Routes>
          <Route path="/shelter" element={<Shelter />} />
          <Route path="/shelter/:id" element={<ShelterDetail />} />
          <Route path="/trial-stay" element={<TrialStay />} />
          <Route path="/adoption-requests" element={<AdoptionRequest />} />
          <Route path="/review" element={<Review />} />
          <Route path="/manage-requests" element={<ManageRequests />} />
          <Route path="/pet-register" element={<PetRegister />} /> 
          <Route path="*" element={<Navigate to="/shelter" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App