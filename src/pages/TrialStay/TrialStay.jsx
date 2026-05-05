import { useState } from 'react';
import { Calendar, Clock, CheckCircle2, MapPin, Phone, Mail, Heart } from 'lucide-react';
import styles from './TrialStay.module.css';

export function TrialStay() {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const pet = {
    id: 1,
    name: 'Luna',
    breed: 'Cavalier King Charles',
    age: '1 año',
    size: 'Perro Pequeño',
    gender: 'Hembra',
    location: 'Bogotá, Colombia',
    description: 'Luna es una perrita muy cariñosa y juguetona. Le encanta estar con personas y es excelente con niños.',
  };

  const availableTimes = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

  const getDaysInRange = (startDate, numDays) => {
    const start = startDate ? new Date(startDate) : new Date();
    if (startDate) start.setDate(start.getDate() + 1);
    return Array.from({ length: numDays }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const formatDateForApi = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleConfirm = async () => {
    if (!selectedStartDate || !selectedEndDate || !selectedTime) {
      alert("Por favor selecciona las fechas y la hora.");
      return;
    }

  const trialStayData = {
    startDate: formatDateForApi(selectedStartDate),
    endDate: formatDateForApi(selectedEndDate),
    observations: `Hora de visita: ${selectedTime}`, // Tu DTO/Entity usa 'observations'
    result: "PENDIENTE",                            
    petId: pet.id,                                                                       
  };

    try {
      const response = await fetch('http://localhost:8080/api/trial-stays', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trialStayData)
      });
      
      if (response.ok) {
        setIsConfirmed(true);
        console.log("Prueba de convivencia agendada con éxito");
      } else {
        const errorText = await response.text().catch(() => '');
        console.error("Error al agendar: Servidor respondió con estado", response.status, errorText);
        alert(errorText || "El servidor encontró un problema.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>
        <div className={styles.gridLayout}>
          
          {/* COLUMNA IZQUIERDA: PERFIL */}
          <aside className={styles.petCard}>
            <div className={styles.petImage}><div className={styles.badgeAvailable}>Disponible</div></div>
            <div className={styles.petInfo}>
              <h2 className={styles.petName}>{pet.name}</h2>
              <p className={styles.petBreed}>{pet.breed}</p>
              <div className={styles.infoGrid}>
                <div className={`${styles.infoBox} ${styles.orange}`}><p className={styles.infoLabel}>Edad</p><p className={styles.infoValue}>{pet.age}</p></div>
                <div className={`${styles.infoBox} ${styles.pink}`}><p className={styles.infoLabel}>Tamaño</p><p className={styles.infoValue}>{pet.size}</p></div>
                <div className={`${styles.infoBox} ${styles.purple}`}><p className={styles.infoLabel}>Género</p><p className={styles.infoValue}>{pet.gender}</p></div>
                <div className={`${styles.infoBox} ${styles.green}`}><p className={styles.infoLabel}>Vacunas</p><p className={`${styles.infoValue} ${styles.greenText}`}>Al día</p></div>
              </div>
              <div className={styles.locationBox}><MapPin size={16} /> {pet.location}</div>
              <p className={styles.petDescription}>{pet.description}</p>
              <div className={styles.contactSection}>
                <div className={styles.contactItem}><Phone size={16} /> +57 300 123 4567</div>
                <div className={styles.contactItem}><Mail size={16} /> adopciones@ejemplo.com</div>
              </div>
            </div>
          </aside>

          {/* COLUMNA DERECHA: PROCESO */}
          <div className={styles.rightColumn}>
            <section className={styles.bookingSection}>
              <div className={styles.bookingHeader}>
                <div className={styles.bookingIcon}><Calendar size={20} color="white" /></div>
                <div>
                  <h2 className={styles.bookingTitle}>Agendar Prueba de Convivencia</h2>
                  <p className={styles.bookingSubtitle}>Sigue los pasos para conocer a tu futura mascota</p>
                </div>
              </div>

              {/* PASO 1: FECHA INICIO */}
              <div className={styles.stepSection}>
                <div className={styles.stepHeader}>
                  <div className={`${styles.stepNumber} ${selectedStartDate ? styles.complete : styles.active}`}>1</div>
                  <h3 className={styles.stepTitle}>Selecciona fecha de inicio</h3>
                </div>
                <div className={styles.dateGrid}>
                  {getDaysInRange(null, 7).map((day, i) => (
                    <button key={i} className={`${styles.dateButton} ${selectedStartDate?.toDateString() === day.toDateString() ? styles.selected : ''}`}
                      onClick={() => {setSelectedStartDate(day); setSelectedEndDate(null); setSelectedTime(null); setIsConfirmed(false);}}>
                      <span className={styles.dateWeekday}>{day.toLocaleDateString('es-ES', { weekday: 'short' })}</span>
                      <span className={styles.dateDay}>{day.getDate()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* PASO 2: FECHA FIN */}
              {selectedStartDate && (
                <div className={`${styles.stepSection} ${styles.fadeIn}`}>
                  <div className={styles.stepHeader}>
                    <div className={`${styles.stepNumber} ${selectedEndDate ? styles.complete : styles.active}`}>2</div>
                    <h3 className={styles.stepTitle}>Selecciona fecha de fin</h3>
                  </div>
                  <div className={styles.dateGrid}>
                    {getDaysInRange(selectedStartDate, 7).map((day, i) => (
                      <button key={i} className={`${styles.dateButton} ${selectedEndDate?.toDateString() === day.toDateString() ? styles.selected : ''}`}
                        onClick={() => {setSelectedEndDate(day); setSelectedTime(null); setIsConfirmed(false);}}>
                        <span className={styles.dateWeekday}>{day.toLocaleDateString('es-ES', { weekday: 'short' })}</span>
                        <span className={styles.dateDay}>{day.getDate()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PASO 3: HORA */}
              {selectedEndDate && (
                <div className={`${styles.stepSection} ${styles.fadeIn}`}>
                  <div className={styles.stepHeader}>
                    <div className={`${styles.stepNumber} ${selectedTime ? styles.complete : styles.active}`}>3</div>
                    <h3 className={styles.stepTitle}>Selecciona una hora: </h3>
                  </div>
                  <div className={styles.timeGrid}>
                    {availableTimes.map(t => (
                      <button key={t} className={`${styles.timeButton} ${selectedTime === t ? styles.selected : ''}`}
                        onClick={() => {setSelectedTime(t); setIsConfirmed(false);}}>
                        <Clock size={14} /> {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PASO 4: CONFIRMACIÓN FINAL */}
              {selectedTime && (
                <div className={`${styles.stepSection} ${styles.fadeIn}`}>
                  <div className={styles.stepHeader}>
                    <div className={`${styles.stepNumber} ${isConfirmed ? styles.complete : styles.active}`}>4</div>
                    <h3 className={styles.stepTitle}>Confirmar reserva</h3>
                  </div>
                  
                  <div className={styles.confirmationWrapper}>
                    <div className={styles.confirmationBox}>
                      <p className={styles.confirmationText}>Estás a punto de agendar una prueba de convivencia con:</p>
                      
                      <div className={styles.confirmationDetail}>
                        <Heart size={18} fill="#db2777" color="#db2777" />
                        <span className={styles.confirmValueBold}>{pet.name}</span>
                      </div>

                      <div className={styles.confirmationDetail}>
                        <Calendar size={18} color="#db2777" />
                        <div className={styles.dateColumn}>
                          <span className={styles.dateLabel}>Inicio:</span>
                          <span className={styles.confirmValue}>{formatDate(selectedStartDate)}</span>
                        </div>
                      </div>

                      <div className={styles.confirmationDetail}>
                        <Calendar size={18} color="#db2777" />
                        <div className={styles.dateColumn}>
                          <span className={styles.dateLabel}>Fin:</span>
                          <span className={styles.confirmValue}>{formatDate(selectedEndDate)}</span>
                        </div>
                      </div>

                      <div className={styles.confirmationDetail}>
                        <Clock size={18} color="#db2777" />
                        <span className={styles.confirmValue}>Hora de la prueba de convivencia : {selectedTime}</span>
                      </div>
                    </div>

                    {!isConfirmed ? (
                      <button className={styles.btnConfirmTrial} onClick={handleConfirm}>
                        Confirmar Prueba de Convivencia
                      </button>
                    ) : (
                      <div className={styles.successMessage}>
                        <CheckCircle2 size={24} color="#10b981" />
                        <p>¡Prueba agendada con éxito!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* SECCIÓN DE CONSEJOS */}
            <section className={styles.tipsSection}>
              <h3 className={styles.tipsTitle}>Consejos para la Prueba de Convivencia</h3>
              <div className={styles.tipsList}>
                {[
                  "Llega puntual y con tiempo suficiente para conocer a la mascota",
                  "Trae snacks o premios que le gusten (pregunta antes por alergias)",
                  "Observa su comportamiento y cómo interactúa contigo",
                  "Haz preguntas sobre sus hábitos, alimentación y cuidados",
                  "Si tienes otras mascotas en casa, menciona cómo es su convivencia"
                ].map((tip, i) => (
                  <div key={i} className={styles.tipItem}>
                    <span className={styles.tipNumber}>{i + 1}</span>
                    <p className={styles.tipText}>{tip}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}