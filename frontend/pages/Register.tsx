import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Library, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { storageService } from '../services/storage';

interface RegisterProps {
  onLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const users = storageService.getUsers();
    
    if (users.some(u => u.email === email)) {
      setError(t('errEmailExists'));
      return;
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email
    };

    storageService.saveUsers([...users, newUser]);
    storageService.setCurrentUser(newUser);
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-brand-500 text-white p-3 rounded-xl mb-4">
            <Library size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{t('appName')}</h1>
          <p className="text-slate-500 mt-2">{t('register')}</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('name')}</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
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
            {t('register')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          {t('alreadyHaveAccount')} <Link to="/login" className="text-brand-600 font-medium hover:underline">{t('login')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
