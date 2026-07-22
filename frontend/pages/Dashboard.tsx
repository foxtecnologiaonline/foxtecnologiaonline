import React from 'react';
import { Collection, CollectibleItem, User } from '../types';
import { DollarSign, Package, Library, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardProps {
  collections: Collection[];
  items: CollectibleItem[];
  user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ collections, items, user }) => {
  const { t } = useLanguage();
  const totalValue = items.reduce((sum, item) => sum + (item.estimatedValue || 0), 0);
  const recentItems = [...items].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto mt-16 md:mt-0">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{t('welcomeBack')}, {user?.name || t('collector')}</h1>
        <p className="text-slate-500 mt-1">{t('overview')}</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-10">
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-emerald-100 p-3 md:p-4 rounded-xl text-emerald-600">
            <DollarSign size={24} className="md:w-7 md:h-7" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium text-slate-500">{t('totalValue')}</p>
            <p className="text-xl md:text-2xl font-bold text-slate-900">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>
        
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-blue-100 p-3 md:p-4 rounded-xl text-blue-600">
            <Package size={24} className="md:w-7 md:h-7" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium text-slate-500">{t('totalItems')}</p>
            <p className="text-xl md:text-2xl font-bold text-slate-900">{items.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 sm:col-span-2 md:col-span-1">
          <div className="bg-purple-100 p-3 md:p-4 rounded-xl text-purple-600">
            <Library size={24} className="md:w-7 md:h-7" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium text-slate-500">{t('collections')}</p>
            <p className="text-xl md:text-2xl font-bold text-slate-900">{collections.length}</p>
          </div>
        </div>
      </div>

      {/* Recent Additions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp size={20} className="text-brand-500" /> {t('recentAdditions')}
          </h2>
          <Link to="/collections" className="text-sm font-medium text-brand-600 hover:text-brand-700">{t('viewAll')}</Link>
        </div>

        {recentItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-8 md:p-12 text-center">
            <Package size={40} className="mx-auto text-slate-300 mb-4 md:w-12 md:h-12" />
            <h3 className="text-base md:text-lg font-medium text-slate-700">{t('noItemsYet')}</h3>
            <p className="text-sm md:text-base text-slate-500 mt-1">{t('startBuilding')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {recentItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
                <div className="h-40 md:h-48 bg-slate-100 overflow-hidden relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-800 shadow-sm">
                    ${item.estimatedValue.toLocaleString()}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs font-medium text-brand-600 mb-1 uppercase tracking-wider">{item.category}</p>
                  <h3 className="font-semibold text-slate-900 truncate">{item.name}</h3>
                  <p className="text-sm text-slate-500 mt-1 truncate">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
