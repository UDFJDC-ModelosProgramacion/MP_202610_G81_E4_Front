import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png' 
// Rutas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { TrialStay } from './pages/TrialStay/TrialStay'
import { Shelter } from './pages/Shelter/Shelter'
import { ShelterDetail } from './pages/ShelterDetail/ShelterDetail'
import { AdoptionRequest } from './pages/AdoptionRequest/AdoptionRequest'
import { Register } from './pages/Register/Register'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <Router>
      <Routes>
        <Route path="/trial-stay" element={<TrialStay />} />
        <Route path="/shelter" element={<Shelter />} />
        <Route path="/shelter/:id" element={<ShelterDetail />} />
      </Routes>
      {/* Contenedor principal con flexbox para alinear Sidebar y Contenido */}
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        
        {/* 1. Sidebar Fijo */}
        <Sidebar />

        {/* 2. Área de contenido que cambia según la ruta */}
        <main style={{ 
          flex: 1, 
          marginLeft: '150px', // Espacio para que el Sidebar no tape el contenido
          padding: '20px',
          backgroundColor: '#f9fafb',
          minHeight: '100vh'
        }}>
          <Routes>
            <Route path="/trial-stay" element={<TrialStay />} />
            <Route path="/shelter" element={<Shelter />} />
            <Route path="/adoption-requests" element={<AdoptionRequest />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Shelter />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App