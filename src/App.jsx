import { useState } from 'react'
// Estos archivos deben estar en la carpeta: src/assets/
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {TrialStay} from './pages/TrialStay/TrialStay'
import {AdoptionRequest} from './pages/AdoptionRequest/AdoptionRequest'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
    <Routes>
      <Route path="/trial-stay" element={<TrialStay />} />
      <Route path="/adoption-requests" element={<AdoptionRequest/>}/>
    </Routes>
   </Router>
  )
}

export default App