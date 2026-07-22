import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Library, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { storageService } from '../services/storage';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = storageService.getUsers();
    const user = users.find(u => u.email === email); // Mocking password check for simplicity in SPA
    
    if (user && password) {
      storageService.setCurrentUser(user);
      onLogin();
      navigate('/dashboard');
    } else {
      setError(t('errInvalidLogin'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-brand-500 text-white p-3 rounded-xl mb-4">
            <Library size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{t('appName')}</h1>
          <p className="text-slate-500 mt-2">{t('login')}</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('email')}</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('password')}</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-brand-600 text-white py-3 rounded-lg font-medium hover:bg-brand-700 transition-colors"
          >
            {t('login')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          {t('dontHaveAccount')} <Link to="/register" className="text-brand-600 font-medium hover:underline">{t('register')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
