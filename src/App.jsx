import { useState } from 'react'
// Estos archivos deben estar en la carpeta: src/assets/
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png' 
import './App.css'
import PetForm from './components/PetForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="root"> 
      <section id="center" className="pet-ui">
  
  <div className="phone-card">
    
    <div className="header">
      <span>🐾</span>
      <h3>Registrar mascota</h3>
      <span>≡</span>
    </div>

    <PetForm />

  </div>

</section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          {/* IMPORTANTE: icons.svg debe estar en la carpeta PUBLIC.
              No se importa arriba, se llama directamente así:
          */}
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#icon-paw"></use>
          </svg>
          <h2>Documentación</h2>
          <p>Gestión y Patrones de Diseño</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank" rel="noreferrer">
                <img className="logo" src={viteLogo} alt="Vite" />
                Vite Doc
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                <img className="button-icon" src={reactLogo} alt="React" />
                React Doc
              </a>
            </li>
          </ul>
        </div>

        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#icon-paw"></use>
          </svg>
          <h2>Comunidad</h2>
          <p>Únete al refugio digital</p>
          <ul>
            <li>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <svg className="button-icon" aria-hidden="true">
                  {/* Asegúrate de que el id sea github-icon en tu icons.svg */}
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noreferrer">
                <svg className="button-icon" aria-hidden="true">
                  {/* Asegúrate de que el id sea discord-icon en tu icons.svg */}
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </div>
  )
}

export default App