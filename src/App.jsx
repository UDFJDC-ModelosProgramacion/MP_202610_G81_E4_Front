import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TrialStay } from './pages/TrialStay/TrialStay'
import { Shelter } from './pages/Shelter/Shelter'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <Router>
      <Routes>
        <Route path="/trial-stay" element={<TrialStay />} />
        <Route path="/shelter" element={<Shelter />} />
      </Routes>
    </Router>
  )
}

export default App