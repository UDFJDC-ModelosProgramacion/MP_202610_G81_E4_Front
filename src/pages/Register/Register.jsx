import { useState } from 'react';
import { User, Mail, Lock, UserPlus, Shield, Eye, EyeOff } from 'lucide-react';
import style from './Register.module.css';

export const Register = () => {
  const [role, setRole] = useState('user');
  const [showPass, setShowPass] = useState(false);

  return (
    <div className={`${style.appContainer} ${style.fadeIn}`}>
      <main className={style.mainContent}>
        <div className={style.gridLayout}>
          
          <section className={style.registerCard}>
            {/* Encabezado Fucsia muy clarito y SÓLIDO (Sin degradado) */}
            <header className={style.headerSolidLight}>
              <div className={style.iconCircle}>
                <UserPlus color="#db2777" size={30} />
              </div>
              <h1 className={style.cardTitle}>Registro de Usuario</h1>
              <p className={style.cardSubtitle}>Únete a nuestra comunidad de amantes de las mascotas</p>
            </header>

            <div className={style.formPadding}>
              {/* Paso 1: Tipo de cuenta */}
              <div className={style.sectionSpace}>
                <div className={style.stepLabel}>
                  <div className={style.stepNumber}>1</div>
                  <span>Selecciona tu perfil</span>
                </div>
                <div className={style.roleGrid}>
                  <button 
                    type="button"
                    className={`${style.roleBtn} ${role === 'user' ? style.roleActive : ''}`}
                    onClick={() => setRole('user')}
                  >
                    <User size={20} />
                    <span>Usuario</span>
                  </button>
                  <button 
                    type="button"
                    className={`${style.roleBtn} ${role === 'admin' ? style.roleActive : ''}`}
                    onClick={() => setRole('admin')}
                  >
                    <Shield size={20} />
                    <span>Administrador</span>
                  </button>
                </div>
              </div>

              {/* Paso 2: Datos */}
              <div className={style.sectionSpace}>
                <div className={style.stepLabel}>
                  <div className={style.stepNumber}>2</div>
                  <span>Información personal</span>
                </div>
                
                <div className={style.inputStack}>
                  <div className={style.fieldBox}>
                    <label>Nombre completo *</label>
                    <div className={style.inputControl}>
                      <User size={18} color="#db2777" />
                      <input type="text" placeholder="Ej: Diana G81" />
                    </div>
                  </div>

                  <div className={style.fieldBox}>
                    <label>Correo electrónico *</label>
                    <div className={style.inputControl}>
                      <Mail size={18} color="#db2777" />
                      <input type="email" placeholder="correo@ejemplo.com" />
                    </div>
                  </div>

                  <div className={style.fieldBox}>
                    <label>Contraseña *</label>
                    <div className={style.inputControl}>
                      <Lock size={18} color="#db2777" />
                      <input type={showPass ? "text" : "password"} placeholder="Mínimo 8 caracteres" />
                      <button type="button" onClick={() => setShowPass(!showPass)} className={style.eyeBtn}>
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className={style.fieldBox}>
                    <label>Confirmar contraseña *</label>
                    <div className={style.inputControl}>
                      <Lock size={18} color="#db2777" />
                      <input type={showPass ? "text" : "password"} placeholder="Repite tu contraseña" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón Fucsia #db2777 SÓLIDO */}
              <button className={style.btnSubmitFuchsia}>
                Crear cuenta ahora
              </button>

              <p className={style.footerText}>
                ¿Ya tienes cuenta? <span className={style.linkFuchsia}>Inicia sesión</span>
              </p>
            </div>
          </section>

          {/* Panel Lateral de Stats */}
          <aside className={style.sideInfo}>
            <div className={style.statsCard}>
              <h3 className={style.statsTitle}>Nuestra comunidad</h3>
              <div className={style.statRow}>
                <div className={style.miniBox}>2.5k</div>
                <p>Usuarios activos</p>
              </div>
              <div className={style.statRow}>
                <div className={style.miniBox}>150+</div>
                <p>Refugios registrados</p>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};