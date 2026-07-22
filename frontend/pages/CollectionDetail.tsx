import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Collection, CollectibleItem } from '../types';
import { ArrowLeft, Plus, Search, Info, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CollectionDetailProps {
  collections: Collection[];
  items: CollectibleItem[];
  onOpenAddItem: (collectionId: string) => void;
}

const CollectionDetail: React.FC<CollectionDetailProps> = ({ collections, items, onOpenAddItem }) => {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<CollectibleItem | null>(null);
  
  const collection = collections.find(c => c.id === id);
  const collectionItems = items.filter(i => i.collectionId === id);
  
  if (!collection) {
    return (
      <div className="p-8 text-center mt-16 md:mt-0">
        <h2 className="text-2xl font-bold text-slate-800">{t('collectionNotFound')}</h2>
        <button onClick={() => navigate('/collections')} className="mt-4 text-brand-600 hover:underline">{t('goBackToCollections')}</button>
      </div>
    );
  }

  const totalValue = collectionItems.reduce((sum, item) => sum + (item.estimatedValue || 0), 0);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col h-full mt-16 md:mt-0">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <Link to="/collections" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 mb-4 transition-colors">
          <ArrowLeft size={16} /> {t('backToCollections')}
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{collection.name}</h1>
            {collection.description && <p className="text-sm md:text-base text-slate-500 mt-2 max-w-2xl">{collection.description}</p>}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-4 text-xs md:text-sm">
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium">{collectionItems.length} {t('items')}</span>
              <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full font-medium">{t('totalValue')}: ${totalValue.toLocaleString()}</span>
            </div>
          </div>
          <button 
            onClick={() => onOpenAddItem(collection.id)}
            className="bg-brand-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-brand-700 transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap w-full md:w-auto"
          >
            <Plus size={20} /> {t('addItem')}
          </button>
        </div>
      </div>

      {/* Items Grid */}
      {collectionItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200 border-dashed p-8 md:p-12">
          <div className="bg-slate-50 p-4 rounded-full mb-4">
            <Search size={24} className="text-slate-400 md:w-8 md:h-8" />
          </div>
          <h3 className="text-base md:text-lg font-medium text-slate-800">{t('collectionEmpty')}</h3>
          <p className="text-sm md:text-base text-slate-500 mt-1 mb-6 text-center max-w-sm">{t('startBuilding')}</p>
          <button 
            onClick={() => onOpenAddItem(collection.id)}
            className="bg-white border border-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            {t('addFirstItem')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {collectionItems.map(item => (
            <div 
              key={item.id} 
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:border-brand-300 transition-all cursor-pointer group flex flex-col"
            >
              <div className="h-40 md:h-48 bg-slate-100 relative overflow-hidden p-2 flex items-center justify-center">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-800 shadow-sm">
                  ${item.estimatedValue.toLocaleString()}
                </div>
              </div>
              <div className="p-3 md:p-4 flex-1 flex flex-col">
                <p className="text-[10px] md:text-xs font-medium text-brand-600 mb-1 uppercase tracking-wider">{item.category}</p>
                <h3 className="font-semibold text-slate-900 line-clamp-1 text-sm md:text-base" title={item.name}>{item.name}</h3>
                <p className="text-xs md:text-sm text-slate-500 mt-1 line-clamp-2 flex-1">{item.description}</p>
                <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] md:text-xs text-slate-500">
                  <span>{t('cond')}: {item.condition}</span>
                  <span className="flex items-center gap-1 text-brand-600 font-medium">{t('viewDetails')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-2 md:p-4" onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col md:flex-row overflow-hidden" onClick={e => e.stopPropagation()}>
            
            {/* Image Side */}
            <div className="md:w-2/5 bg-slate-100 p-4 md:p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 min-h-[30vh] md:min-h-0">
              <img src={selectedItem.imageUrl} alt={selectedItem.name} className="max-w-full max-h-[30vh] md:max-h-[70vh] object-contain drop-shadow-md rounded-lg" />
            </div>
            
            {/* Details Side */}
            <div className="md:w-3/5 flex flex-col h-full max-h-[65vh] md:max-h-[90vh] overflow-y-auto">
              <div className="p-4 md:p-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-brand-100 text-brand-800 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded mb-2">
                      {selectedItem.category}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">{selectedItem.name}</h2>
                  </div>
                  <div className="text-left sm:text-right bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                    <p className="text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-wider">{t('estValue')}</p>
                    <p className="text-xl md:text-2xl font-bold text-emerald-600">${selectedItem.estimatedValue.toLocaleString()}</p>
                  </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold text-slate-900 mb-1">{t('description')}</h3>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{selectedItem.description}</p>
                  </div>

                  <div className="flex items-center gap-4 md:gap-6 py-3 md:py-4 border-y border-slate-100">
                    <div>
                      <p className="text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{t('condition')}</p>
                      <p className="font-medium text-sm md:text-base text-slate-900">{selectedItem.condition}</p>
                    </div>
                    <div>
                      <p className="text-[10px] md:text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{t('addedOn')}</p>
                      <p className="font-medium text-sm md:text-base text-slate-900">{new Date(selectedItem.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* AI Research Section */}
                  <div className="bg-blue-50/50 rounded-xl p-4 md:p-5 border border-blue-100">
                    <h3 className="flex items-center gap-2 text-xs md:text-sm font-semibold text-blue-900 mb-2 md:mb-3">
                      <Info size={16} className="text-blue-600" /> {t('aiMarketResearch')}
                    </h3>
                    <p className="text-xs md:text-sm text-blue-800 leading-relaxed whitespace-pre-wrap">
                      {selectedItem.priceResearchNotes || t('noResearchNotes')}
                    </p>
                    
                    {selectedItem.groundingUrls && selectedItem.groundingUrls.length > 0 && (
                      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-blue-200/50">
                        <h4 className="text-[10px] md:text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2">{t('sources')}</h4>
                        <ul className="space-y-1.5 md:space-y-2">
                          {selectedItem.groundingUrls.map((url, idx) => (
                            <li key={idx}>
                              <a href={url.uri} target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-start gap-2 group">
                                <ExternalLink size={14} className="mt-0.5 flex-shrink-0 opacity-50 group-hover:opacity-100" />
                                <span className="line-clamp-1">{url.title || url.uri}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-auto p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button onClick={() => setSelectedItem(null)} className="px-5 md:px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm md:text-base font-medium hover:bg-slate-50 transition-colors">
                  {t('close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionDetail;
