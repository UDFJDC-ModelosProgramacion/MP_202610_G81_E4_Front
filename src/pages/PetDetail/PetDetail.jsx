import './PetDetail.css'

import dogImage from '../../assets/dog.jpg'

function PetDetail() {
  return (
    <div className="detail-container">

      <div className="detail-card">

        {/* Header */}
        <div className="detail-header">
          <div className="logo">🐾</div>

          <h1>Detalle de mascota</h1>

          <div className="menu-icon">☰</div>
        </div>

        {/* Content */}
        <div className="detail-content">

          <div className="pet-top-info">

            <img
              src={dogImage}
              alt="Mascota"
              className="pet-detail-image"
            />

            <div className="pet-data">
              <h2>Max</h2>

              <p><strong>Especie:</strong> Perro</p>
              <p><strong>Raza:</strong> Labrador</p>
              <p><strong>Edad:</strong> 5 años</p>
              <p><strong>Estado:</strong> Disponible</p>
            </div>

          </div>

          {/* Description */}
          <div className="description-section">

            <h3>Descripción</h3>

            <div className="description-box">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Mauris sed eros turpis. Donec facilisis sapien in
              lectus vulputate, sed luctus augue suscipit.
            </div>

          </div>

          {/* Button */}
          <button className="back-button">
            Volver
          </button>

        </div>

      </div>

    </div>
  )
}

export default PetDetail