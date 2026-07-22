import React from 'react';
import { Link } from 'react-router-dom';
import { Library, Camera, DollarSign, Layers, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

const LandingPage: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-brand-500 text-white p-1.5 rounded-lg">
              <Library size={24} />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">{t('appName')}</span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Globe size={16} />
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="text-sm bg-transparent outline-none cursor-pointer font-medium"
              >
                <option value="en">EN</option>
                <option value="pt">PT</option>
                <option value="es">ES</option>
              </select>
            </div>
            <Link 
              to="/login" 
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors hidden sm:block"
            >
              {t('login')}
            </Link>
            <Link 
              to="/register" 
              className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors shadow-sm"
            >
              {t('lpGetStarted')}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?blur=10')] bg-cover bg-center opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              {t('lpHeroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('lpHeroDesc')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/register" 
                className="w-full sm:w-auto bg-brand-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-brand-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {t('lpGetStarted')}
              </Link>
              <Link 
                to="/login" 
                className="w-full sm:w-auto bg-white text-slate-700 border border-slate-300 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-50 transition-all shadow-sm"
              >
                {t('login')}
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900">{t('lpFeatures')}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 mb-6">
                  <Camera size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('lpFeature1Title')}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {t('lpFeature1Desc')}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 mb-6">
                  <DollarSign size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('lpFeature2Title')}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {t('lpFeature2Desc')}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-50 p-4 rounded-2xl text-purple-600 mb-6">
                  <Layers size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{t('lpFeature3Title')}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {t('lpFeature3Desc')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white">
            <Library size={24} className="text-brand-500" />
            <span className="text-xl font-bold tracking-tight">{t('appName')}</span>
          </div>
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} {t('appName')}. {t('allRightsReserved')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
