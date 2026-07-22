import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Library, LogOut, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: t('dashboard') },
    { to: '/collections', icon: <Library size={20} />, label: t('myCollections') },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="bg-brand-500 text-white p-1.5 rounded-lg">
            <Library size={20} />
          </div>
          <h1 className="text-lg font-bold text-slate-800">{t('appName')}</h1>
        </div>
        <button onClick={toggleSidebar} className="text-slate-600 p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 h-screen flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-6 hidden md:flex items-center gap-3 border-b border-slate-100">
          <div className="bg-brand-500 text-white p-2 rounded-lg">
            <Library size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">{t('appName')}</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 mt-16 md:mt-0 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-2 px-4">
            <Globe size={16} className="text-slate-400" />
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="text-sm bg-transparent text-slate-600 outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="pt">Português</option>
              <option value="es">Español</option>
            </select>
          </div>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">{t('logout')}</span>
          </button>
          
          <div className="text-xs text-slate-400 text-center pt-2">
            Powered by Gemini AI
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
