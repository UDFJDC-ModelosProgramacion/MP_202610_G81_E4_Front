import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import style from '../Login/Login.module.css';

const ADMIN_CREDENTIALS = {
  email: 'admin@ejemplo.com',
  password: 'admin123'
};

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setLoginError('');
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!credentials.email.trim()) newErrors.email = 'El correo es obligatorio';
    if (!credentials.password) newErrors.password = 'La contraseña es obligatoria';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (
        credentials.email.trim() === ADMIN_CREDENTIALS.email &&
        credentials.password === ADMIN_CREDENTIALS.password
      ) {
        navigate('/shelter');
      } else {
        setLoginError('Credenciales de administrador incorrectas.');
      }
    }
  };

  return (
    <div className={`${style.appContainer} ${style.fadeIn}`}>
      <div className={style.loginCard}>

        <div className={style.loginHeader}>
          <div className={style.logoIconBox}>
            <ShieldCheck size={26} color="#ffffff" />
          </div>
          <h2 className={style.loginTitle}>Panel Administrativo</h2>
          <p className={style.loginSubtitle}>Acceso exclusivo para administradores del sistema</p>
        </div>

        <form onSubmit={handleSubmit} className={style.loginBody}>

          {loginError && (
            <div className={style.errorMessage} style={{ justifyContent: 'center', backgroundColor: '#fdf2f2', padding: '0.8rem', borderRadius: '10px', border: '1px solid #d4183d' }}>
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <div className={style.fieldGroup}>
            <label className={style.inputLabel}>Correo Electrónico</label>
            <div className={style.inputWrapper}>
              <Mail size={18} className={style.inputIcon} />
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="admin@ejemplo.com"
                className={`${style.textInput} ${(errors.email || loginError) ? style.inputError : ''}`}
              />
            </div>
            {errors.email && <div className={style.errorMessage}><AlertCircle size={14} /><span>{errors.email}</span></div>}
          </div>

          <div className={style.fieldGroup}>
            <label className={style.inputLabel}>Contraseña</label>
            <div className={style.inputWrapper}>
              <Lock size={18} className={style.inputIcon} />
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`${style.textInput} ${(errors.password || loginError) ? style.inputError : ''}`}
              />
            </div>
            {errors.password && <div className={style.errorMessage}><AlertCircle size={14} /><span>{errors.password}</span></div>}
          </div>

          <button type="submit" className={style.btnLoginSubmit}>
            <LogIn size={20} />
            <span>Ingresar como Administrador</span>
          </button>

          <div className={style.quickAccessSection}>
            <button type="button" className={style.quickAccessBtn} onClick={() => navigate('/login')}>
              <div className={style.quickAccessIconPink}>
                <LogIn size={18} />
              </div>
              <span>Ir al login de usuarios</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};