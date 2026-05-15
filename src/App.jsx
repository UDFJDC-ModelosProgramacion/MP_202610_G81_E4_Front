import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { TrialStay } from './pages/TrialStay/TrialStay'
import { Shelter } from './pages/Shelter/Shelter'
import { ShelterDetail } from './pages/ShelterDetail/ShelterDetail'
import { AdoptionRequest } from './pages/AdoptionRequest/AdoptionRequest'
import { Register } from './pages/Register/Register'
import { Review } from './pages/Review/Review'
import { ManageRequests } from './pages/ManageRequest/ManageRequests'
import './App.css'

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar />

        {/* Área de contenido principal con el fondo fucsia clarito */}
        <main style={{
          flex: 1,
          marginLeft: '150px',
          padding: '20px',
          backgroundColor: '#fce7f3',
          minHeight: '100vh'
        }}>
          <Routes>
            <Route path="/" element={<Shelter />} />
            <Route path="/shelter" element={<Shelter />} />
            <Route path="/shelter/:id" element={<ShelterDetail />} />
            <Route path="/trial-stay" element={<TrialStay />} />
            <Route path="/adoption-requests" element={<AdoptionRequest />} />
            <Route path="/review" element={<Review />} />
            <Route path="/manage-requests" element={<ManageRequests />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App