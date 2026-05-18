import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Mail, Lock, LogIn, AlertCircle, UserPlus, ShieldCheck } from 'lucide-react';
import style from './Login.module.css';

const VALID_CREDENTIALS = {
  email: 'usuario@ejemplo.com',
  password: '12345678'
};

const VALID_CREDENTIALS_ADMIN = {
  email: 'admin@ejemplo.com',
  password: 'admin123'
};

export const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setLoginError(''); 
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleQuickAdminAccess = () => {
    setCredentials({
      email: VALID_CREDENTIALS_ADMIN.email,
      password: VALID_CREDENTIALS_ADMIN.password
    });
    setLoginError('');
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!credentials.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    }
    if (!credentials.password) {
      newErrors.password = 'La contraseña es obligatoria';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (
        credentials.email.trim() === VALID_CREDENTIALS.email &&
        credentials.password === VALID_CREDENTIALS.password
      ) {
        console.log('Inicio de sesión exitoso');
        navigate('/adoption-requests');
      } else if (
        credentials.email.trim() === VALID_CREDENTIALS_ADMIN.email &&
        credentials.password === VALID_CREDENTIALS_ADMIN.password
      ) {
        console.log('Inicio de sesión de administrador exitoso');
        navigate('/shelter');
      } else {
        setLoginError('El correo electrónico o la contraseña son incorrectos.');
      }
    }
  };

  return (
    <div className={`${style.appContainer} ${style.fadeIn}`}>
      <div className={style.loginCard}>
        
        <div className={style.loginHeader}>
          <div className={style.logoIconBox}>
            <PawPrint size={26} color="#ffffff" />
          </div>
          <h2 className={style.loginTitle}>¡Hola de nuevo!</h2>
          <p className={style.loginSubtitle}>Ingresa tus credenciales para acceder al sistema</p>
        </div>

        <form onSubmit={handleSubmit} className={style.loginBody}>
          
          {loginError && (
            <div className={style.errorMessage} style={{ justifyContent: 'center', backgroundColor: '#fdf2f2', padding: '0.8rem', borderRadius: '10px', border: '1px solid #d4183d' }}>
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <div className={style.fieldGroup}>
            <label htmlFor="email" className={style.inputLabel}>Correo Electrónico</label>
            <div className={style.inputWrapper}>
              <Mail size={18} className={style.inputIcon} />
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="usuario@ejemplo.com"
                className={`${style.textInput} ${(errors.email || loginError) ? style.inputError : ''}`}
              />
            </div>
            {errors.email && (
              <div className={style.errorMessage}>
                <AlertCircle size={14} />
                <span>{errors.email}</span>
              </div>
            )}
          </div>

          <div className={style.fieldGroup}>
            <label htmlFor="password" className={style.inputLabel}>Contraseña</label>
            <div className={style.inputWrapper}>
              <Lock size={18} className={style.inputIcon} />
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`${style.textInput} ${(errors.password || loginError) ? style.inputError : ''}`}
              />
            </div>
            {errors.password && (
              <div className={style.errorMessage}>
                <AlertCircle size={14} />
                <span>{errors.password}</span>
              </div>
            )}
          </div>

          <div className={style.formOptions}>
            <label className={style.rememberMe}>
              <input type="checkbox" className={style.checkboxInput} />
              <span>Recordarme</span>
            </label>
            <a href="#forgot" className={style.forgotPassword}>¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className={style.btnLoginSubmit}>
            <LogIn size={20} />
            <span>Iniciar Sesión</span>
          </button>

          <div className={style.quickAccessSection}>
            <h4 className={style.quickAccessTitle}>Acceso Rápido</h4>
            
            <button 
              type="button" 
              onClick={() => navigate('/register')} 
              className={style.quickAccessBtn}
            >
              <div className={style.quickAccessIconPink}>
                <UserPlus size={18} />
              </div>
              <span>Crear cuenta nueva</span>
            </button>

            <button 
              type="button" 
              onClick={handleQuickAdminAccess} 
              className={style.quickAccessBtn}
            >
              <div className={style.quickAccessIconPurple}>
                <ShieldCheck size={18} />
              </div>
              <span>Acceso administrador</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};