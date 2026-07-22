import React, { useState } from 'react';
import { Collection, CollectibleItem } from '../types';
import { Plus, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface CollectionsProps {
  collections: Collection[];
  items: CollectibleItem[];
  onCreateCollection: (name: string, description: string) => void;
}

const Collections: React.FC<CollectionsProps> = ({ collections, items, onCreateCollection }) => {
  const { t } = useLanguage();
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onCreateCollection(newName, newDesc);
      setNewName('');
      setNewDesc('');
      setIsCreating(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto mt-16 md:mt-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{t('myCollections')}</h1>
          <p className="text-slate-500 mt-1">{t('organizeManage')}</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors flex items-center justify-center gap-2 shadow-sm w-full sm:w-auto"
        >
          <Plus size={20} /> {t('newCollection')}
        </button>
      </div>

      {isCreating && (
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-brand-200 mb-8 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">{t('createCollection')}</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t('name')}</label>
              <input 
                type="text" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={t('collectionNamePlaceholder')}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{t('description')} ({t('optional')})</label>
              <input 
                type="text" 
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder={t('collectionDescPlaceholder')}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
              >
                {t('cancel')}
              </button>
              <button 
                type="submit"
                disabled={!newName.trim()}
                className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 disabled:opacity-50 transition-colors"
              >
                {t('create')}
              </button>
            </div>
          </form>
        </div>
      )}

      {collections.length === 0 && !isCreating ? (
        <div className="bg-white rounded-2xl border border-slate-200 border-dashed p-8 md:p-16 text-center">
          <FolderOpen size={40} className="mx-auto text-slate-300 mb-4 md:w-12 md:h-12" />
          <h3 className="text-lg md:text-xl font-medium text-slate-700">{t('noCollectionsYet')}</h3>
          <p className="text-sm md:text-base text-slate-500 mt-2 mb-6 max-w-md mx-auto">{t('createFirstCollection')}</p>
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-white border border-slate-300 text-slate-700 px-6 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            {t('createCollection')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {collections.map(collection => {
            const collectionItems = items.filter(i => i.collectionId === collection.id);
            const totalValue = collectionItems.reduce((sum, item) => sum + (item.estimatedValue || 0), 0);
            const coverImage = collectionItems.length > 0 ? collectionItems[0].imageUrl : null;

            return (
              <Link 
                key={collection.id} 
                to={`/collections/${collection.id}`}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md hover:border-brand-200 transition-all group block"
              >
                <div className="h-32 md:h-40 bg-slate-100 relative overflow-hidden">
                  {coverImage ? (
                    <img src={coverImage} alt={collection.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <FolderOpen size={32} className="md:w-10 md:h-10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                  <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 text-white">
                    <h3 className="font-bold text-base md:text-lg truncate">{collection.name}</h3>
                    <p className="text-xs md:text-sm text-white/80 truncate">{collection.description || '---'}</p>
                  </div>
                </div>
                <div className="p-3 md:p-4 flex items-center justify-between bg-white">
                  <div>
                    <p className="text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-wider">{t('items')}</p>
                    <p className="font-semibold text-slate-800">{collectionItems.length}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-wider">{t('estValue')}</p>
                    <p className="font-semibold text-brand-600">${totalValue.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Collections;
