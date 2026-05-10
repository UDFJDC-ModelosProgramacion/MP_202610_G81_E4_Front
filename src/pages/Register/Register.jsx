import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, UserPlus, Shield, CheckCircle2, AlertCircle, Heart } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' as 'user' | 'admin'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validatePassword = (password: string) => {
    if (password.length < 8) return 'weak';
    if (password.length < 12) return 'medium';
    return 'strong';
  };

  const passwordStrength = validatePassword(formData.password);

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'weak': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'strong': return '#10b981';
      default: return '#e5e7eb';
    }
  };

  const getStrengthWidth = (strength: string) => {
    switch (strength) {
      case 'weak': return '33%';
      case 'medium': return '66%';
      case 'strong': return '100%';
      default: return '0%';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El correo no es válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSuccess(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', password: '', confirmPassword: '', role: 'user' });
        setIsSuccess(false);
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl text-slate-800">Refugio de Mascotas</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Registration Form */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-8 md:p-10 text-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <UserPlus className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-white text-3xl md:text-4xl mb-3">Registro de Usuario</h1>
              <p className="text-white/90 text-lg">Únete a nuestra comunidad de amantes de las mascotas</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              {isSuccess && (
                <div className="mb-6 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-green-500 rounded-xl p-4 flex items-start gap-3 animate-fade-in">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-green-800 mb-1">¡Registro exitoso!</h4>
                    <p className="text-green-700 text-sm">Tu cuenta ha sido creada correctamente. Bienvenido a nuestra comunidad.</p>
                  </div>
                </div>
              )}

              {/* Role Selection */}
              <div className="mb-6">
                <label className="block text-slate-700 mb-3">Tipo de cuenta</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'user' }))}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      formData.role === 'user'
                        ? 'border-pink-500 bg-gradient-to-br from-pink-50 to-purple-50 shadow-lg'
                        : 'border-slate-200 bg-white hover:border-pink-200'
                    }`}
                  >
                    <User className={`w-8 h-8 mx-auto mb-2 ${formData.role === 'user' ? 'text-pink-600' : 'text-slate-400'}`} />
                    <span className={`block ${formData.role === 'user' ? 'text-pink-700' : 'text-slate-600'}`}>Usuario</span>
                    {formData.role === 'user' && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-5 h-5 text-pink-600" />
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: 'admin' }))}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      formData.role === 'admin'
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                        : 'border-slate-200 bg-white hover:border-purple-200'
                    }`}
                  >
                    <Shield className={`w-8 h-8 mx-auto mb-2 ${formData.role === 'admin' ? 'text-purple-600' : 'text-slate-400'}`} />
                    <span className={`block ${formData.role === 'admin' ? 'text-purple-700' : 'text-slate-600'}`}>Administrador</span>
                    {formData.role === 'admin' && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-5 h-5 text-purple-600" />
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Name Field */}
              <div className="mb-5">
                <label htmlFor="name" className="block text-slate-700 mb-2">
                  Nombre completo <span className="text-pink-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      errors.name
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-slate-200 focus:border-pink-500 focus:shadow-lg focus:shadow-pink-100'
                    }`}
                    placeholder="Ej: Juan Pérez"
                  />
                </div>
                {errors.name && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-5">
                <label htmlFor="email" className="block text-slate-700 mb-2">
                  Correo electrónico <span className="text-pink-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Mail className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      errors.email
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-slate-200 focus:border-pink-500 focus:shadow-lg focus:shadow-pink-100'
                    }`}
                    placeholder="ejemplo@correo.com"
                  />
                </div>
                {errors.email && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-5">
                <label htmlFor="password" className="block text-slate-700 mb-2">
                  Contraseña <span className="text-pink-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Lock className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      errors.password
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-slate-200 focus:border-pink-500 focus:shadow-lg focus:shadow-pink-100'
                    }`}
                    placeholder="Mínimo 8 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-pink-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-300 rounded-full"
                        style={{
                          width: getStrengthWidth(passwordStrength),
                          backgroundColor: getStrengthColor(passwordStrength)
                        }}
                      />
                    </div>
                    <span className="text-sm capitalize" style={{ color: getStrengthColor(passwordStrength) }}>
                      {passwordStrength === 'weak' && 'Débil'}
                      {passwordStrength === 'medium' && 'Media'}
                      {passwordStrength === 'strong' && 'Fuerte'}
                    </span>
                  </div>
                )}
                {errors.password && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-slate-700 mb-2">
                  Confirmar contraseña <span className="text-pink-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Lock className="w-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                      errors.confirmPassword
                        ? 'border-red-300 focus:border-red-500'
                        : 'border-slate-200 focus:border-pink-500 focus:shadow-lg focus:shadow-pink-100'
                    }`}
                    placeholder="Repite tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-pink-500 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl text-lg hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Crear cuenta
              </button>
            </form>

            <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 border-t border-slate-100">
              <p className="text-center text-slate-600">
                ¿Ya tienes cuenta?{' '}
                <a href="#" className="text-pink-500 hover:text-pink-700 transition-colors">
                  Inicia sesión
                </a>
              </p>
            </div>
          </div>

          {/* Info Panel */}
          <div className="flex flex-col gap-6">
            {/* Benefits */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <h2 className="text-slate-800 text-2xl mb-6">¿Por qué registrarse?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-800 mb-1">Adopta mascotas</h3>
                    <p className="text-slate-600 text-sm">Encuentra a tu compañero perfecto y comienza el proceso de adopción</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-800 mb-1">Gestiona refugios</h3>
                    <p className="text-slate-600 text-sm">Si eres administrador, podrás registrar y gestionar refugios</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-800 mb-1">Contacto directo</h3>
                    <p className="text-slate-600 text-sm">Comunícate fácilmente con los refugios y organiza visitas</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-800 mb-1">Comunidad activa</h3>
                    <p className="text-slate-600 text-sm">Únete a una red de personas comprometidas con el bienestar animal</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-2xl p-6 md:p-8">
              <h3 className="text-center text-slate-800 text-xl mb-6">Nuestra comunidad</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center bg-white rounded-xl p-4 shadow-md">
                  <p className="text-3xl text-pink-600 mb-1">2,500+</p>
                  <p className="text-slate-600 text-sm">Usuarios</p>
                </div>
                <div className="text-center bg-white rounded-xl p-4 shadow-md">
                  <p className="text-3xl text-purple-600 mb-1">150+</p>
                  <p className="text-slate-600 text-sm">Refugios</p>
                </div>
                <div className="text-center bg-white rounded-xl p-4 shadow-md">
                  <p className="text-3xl text-pink-600 mb-1">5,000+</p>
                  <p className="text-slate-600 text-sm">Adopciones</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
