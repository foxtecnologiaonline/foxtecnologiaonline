import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Loader2, Search, CheckCircle2, AlertCircle, Info, Images } from 'lucide-react';
import { Collection, CollectibleItem } from '../types';
import { identifyItemFromImage, researchItemValue } from '../services/gemini';
import { useLanguage } from '../contexts/LanguageContext';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  collections: Collection[];
  onSave: (item: Omit<CollectibleItem, 'id' | 'createdAt'>) => void;
  onSaveMultiple: (items: Omit<CollectibleItem, 'id' | 'createdAt'>[]) => void;
  initialCollectionId?: string;
}

type Step = 'upload' | 'analyzing' | 'researching' | 'review' | 'analyzing-bulk';
type UploadMode = 'single' | 'bulk';

// Helper to compress images before saving to avoid localStorage quota issues
const compressImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.6)); // 60% quality JPEG
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, collections, onSave, onSaveMultiple, initialCollectionId }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState<Step>('upload');
  const [uploadMode, setUploadMode] = useState<UploadMode>('single');
  const [error, setError] = useState<string | null>(null);
  
  // Single Form State
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  
  // Bulk Form State
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [bulkProgress, setBulkProgress] = useState<{ current: number, total: number, success: number, failed: number } | null>(null);

  // Common State
  const [collectionId, setCollectionId] = useState<string>(initialCollectionId || (collections.length > 0 ? collections[0].id : ''));
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState(t('good'));
  const [estimatedValue, setEstimatedValue] = useState<number>(0);
  
  // AI Results State
  const [researchNotes, setResearchNotes] = useState('');
  const [groundingUrls, setGroundingUrls] = useState<{uri: string, title: string}[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bulkFileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep('upload');
      setUploadMode('single');
      setError(null);
      setImagePreview(null);
      setImageBase64(null);
      setImageMimeType(null);
      setBulkFiles([]);
      setBulkProgress(null);
      setName('');
      setDescription('');
      setCategory('');
      setCondition(t('good'));
      setEstimatedValue(0);
      setResearchNotes('');
      setGroundingUrls([]);
      if (initialCollectionId) setCollectionId(initialCollectionId);
      else if (collections.length > 0) setCollectionId(collections[0].id);
    }
  }, [isOpen, initialCollectionId, collections, t]);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedDataUrl = await compressImage(file);
      setImagePreview(compressedDataUrl);
      
      const match = compressedDataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
      if (match) {
        setImageMimeType(match[1]);
        setImageBase64(match[2]);
      }
    } catch (err) {
      setError("Failed to process image.");
    }
  };

  const handleBulkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 100) {
      setError(t('tooManyFiles'));
      setBulkFiles(files.slice(0, 100));
    } else {
      setError(null);
      setBulkFiles(files);
    }
  };

  const processSingleImage = async () => {
    if (!imageBase64 || !imageMimeType) return;
    
    setStep('analyzing');
    setError(null);
    
    try {
      const idResult = await identifyItemFromImage(imageBase64, imageMimeType);
      setName(idResult.name);
      setDescription(idResult.description);
      setCategory(idResult.category);
      
      setStep('researching');
      
      const priceResult = await researchItemValue(idResult.name);
      setResearchNotes(priceResult.summary);
      setGroundingUrls(priceResult.urls);
      
      setStep('review');
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis.");
      setStep('review'); // Go to review anyway so they can manually enter data
    }
  };

  const processBulkImages = async () => {
    if (!bulkFiles.length || !collectionId) return;
    
    setStep('analyzing-bulk');
    setBulkProgress({ current: 0, total: bulkFiles.length, success: 0, failed: 0 });
    
    const newItems: Omit<CollectibleItem, 'id' | 'createdAt'>[] = [];
    
    for (let i = 0; i < bulkFiles.length; i++) {
      setBulkProgress(prev => prev ? { ...prev, current: i + 1 } : null);
      const file = bulkFiles[i];
      
      try {
        const compressedDataUrl = await compressImage(file);
        const match = compressedDataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
        
        if (!match) throw new Error("Invalid image format");
        
        const mimeType = match[1];
        const base64Data = match[2];

        // AI Calls
        const idResult = await identifyItemFromImage(base64Data, mimeType);
        
        // Delay to avoid rate limits (15 RPM free tier)
        await new Promise(r => setTimeout(r, 2000));
        
        const priceResult = await researchItemValue(idResult.name);

        newItems.push({
          collectionId,
          name: idResult.name,
          description: idResult.description,
          category: idResult.category,
          condition: t('good'),
          estimatedValue: 0,
          priceResearchNotes: priceResult.summary,
          imageUrl: compressedDataUrl,
          groundingUrls: priceResult.urls
        });
        
        setBulkProgress(prev => prev ? { ...prev, success: prev.success + 1 } : null);

      } catch (err) {
        console.error("Bulk processing error for file", file.name, err);
        
        // Fallback item if AI fails
        try {
          const compressedDataUrl = await compressImage(file);
          newItems.push({
            collectionId,
            name: `${t('unknownItem')} (${file.name})`,
            description: 'Failed to analyze automatically.',
            category: 'Unknown',
            condition: t('good'),
            estimatedValue: 0,
            priceResearchNotes: '',
            imageUrl: compressedDataUrl,
            groundingUrls: []
          });
        } catch (e) {
          // If even compression fails, skip
        }
        setBulkProgress(prev => prev ? { ...prev, failed: prev.failed + 1 } : null);
      }
      
      // Delay between items to respect rate limits
      if (i < bulkFiles.length - 1) {
        await new Promise(r => setTimeout(r, 3000));
      }
    }
    
    onSaveMultiple(newItems);
    onClose();
  };

  const handleSaveSingle = () => {
    if (!collectionId) {
      setError(t('errSelectCollection'));
      return;
    }
    if (!name) {
      setError(t('errItemName'));
      return;
    }
    if (!imagePreview) {
      setError(t('errImage'));
      return;
    }

    onSave({
      collectionId,
      name,
      description,
      category,
      condition,
      estimatedValue,
      priceResearchNotes: researchNotes,
      imageUrl: imagePreview,
      groundingUrls
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-2 md:p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[95vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-100">
          <h2 className="text-lg md:text-xl font-semibold text-slate-800">{t('addItem')}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {error && (
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 text-red-700 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
              <p className="text-xs md:text-sm">{error}</p>
            </div>
          )}

          {step === 'upload' && (
            <div className="space-y-4 md:space-y-6">
              
              {/* Mode Toggle */}
              <div className="flex border-b border-slate-200 mb-4 md:mb-6">
                <button
                  className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${uploadMode === 'single' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  onClick={() => { setUploadMode('single'); setError(null); }}
                >
                  {t('singleItem')}
                </button>
                <button
                  className={`pb-3 px-4 text-sm font-medium border-b-2 transition-colors ${uploadMode === 'bulk' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  onClick={() => { setUploadMode('bulk'); setError(null); }}
                >
                  {t('multipleItems')}
                </button>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1 md:mb-2">{t('selectCollection')}</label>
                <select 
                  value={collectionId} 
                  onChange={(e) => setCollectionId(e.target.value)}
                  className="w-full p-2.5 md:p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm md:text-base"
                >
                  <option value="" disabled>{t('selectCollectionPlaceholder')}</option>
                  {collections.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              {uploadMode === 'single' ? (
                <div>
                  <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1 md:mb-2">{t('itemPhoto')}</label>
                  <div 
                    className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center cursor-pointer transition-colors ${imagePreview ? 'border-brand-500 bg-brand-50' : 'border-slate-300 hover:border-brand-400 hover:bg-slate-50'}`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <div className="flex flex-col items-center">
                        <img src={imagePreview} alt="Preview" className="h-32 md:h-48 object-contain rounded-lg mb-3 md:mb-4 shadow-sm" />
                        <span className="text-xs md:text-sm text-brand-600 font-medium">{t('clickToChangeImage')}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-slate-500">
                        <Upload size={32} className="mb-2 md:mb-3 text-slate-400 md:w-10 md:h-10" />
                        <p className="font-medium text-sm md:text-base text-slate-700">{t('clickToUpload')}</p>
                        <p className="text-xs md:text-sm mt-1">{t('imageFormat')}</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                  <div className="flex justify-end pt-2 md:pt-4">
                    <button 
                      onClick={processSingleImage}
                      disabled={!imagePreview || !collectionId}
                      className="w-full md:w-auto bg-brand-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      {t('analyzeWithAI')}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1 md:mb-2">{t('itemPhoto')}</label>
                  <div 
                    className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center cursor-pointer transition-colors ${bulkFiles.length > 0 ? 'border-brand-500 bg-brand-50' : 'border-slate-300 hover:border-brand-400 hover:bg-slate-50'}`}
                    onClick={() => bulkFileInputRef.current?.click()}
                  >
                    <Images size={32} className="mx-auto mb-2 md:mb-3 text-slate-400 md:w-10 md:h-10" />
                    <p className="font-medium text-sm md:text-base text-slate-700">
                      {bulkFiles.length > 0 ? t('selectedFiles').replace('{count}', bulkFiles.length.toString()) : t('uploadUpTo100')}
                    </p>
                    <p className="text-xs md:text-sm mt-1">{t('imageFormat')}</p>
                    <input 
                      type="file" 
                      ref={bulkFileInputRef} 
                      onChange={handleBulkFileChange} 
                      accept="image/*" 
                      multiple
                      className="hidden" 
                    />
                  </div>
                  
                  {bulkFiles.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-xs md:text-sm rounded-lg flex items-start gap-2">
                      <Info size={16} className="mt-0.5 flex-shrink-0" />
                      <p>{t('bulkWarning')}</p>
                    </div>
                  )}

                  <div className="flex justify-end pt-2 md:pt-4">
                    <button 
                      onClick={processBulkImages}
                      disabled={bulkFiles.length === 0 || !collectionId}
                      className="w-full md:w-auto bg-brand-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      {t('processAll')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {(step === 'analyzing' || step === 'researching') && (
            <div className="flex flex-col items-center justify-center py-12 md:py-20 space-y-4 md:space-y-6">
              <Loader2 size={40} className="text-brand-500 animate-spin md:w-12 md:h-12" />
              <div className="text-center px-4">
                <h3 className="text-base md:text-lg font-medium text-slate-800">
                  {step === 'analyzing' ? t('identifying') : t('researching')}
                </h3>
                <p className="text-xs md:text-sm text-slate-500 mt-2 max-w-md">
                  {step === 'analyzing' ? t('analyzingDesc') : t('researchingDesc')}
                </p>
              </div>
            </div>
          )}

          {step === 'analyzing-bulk' && bulkProgress && (
            <div className="flex flex-col items-center justify-center py-12 md:py-20 space-y-6">
              <Loader2 size={48} className="text-brand-500 animate-spin" />
              <div className="text-center px-4 w-full max-w-md">
                <h3 className="text-base md:text-lg font-medium text-slate-800 mb-2">
                  {t('processingBulk').replace('{current}', bulkProgress.current.toString()).replace('{total}', bulkProgress.total.toString())}
                </h3>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4 overflow-hidden">
                  <div className="bg-brand-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${(bulkProgress.current / bulkProgress.total) * 100}%` }}></div>
                </div>
                
                <div className="flex justify-center gap-6 text-sm">
                  <span className="text-emerald-600 font-medium">{t('successCount').replace('{count}', bulkProgress.success.toString())}</span>
                  <span className="text-red-600 font-medium">{t('failedCount').replace('{count}', bulkProgress.failed.toString())}</span>
                </div>
                <p className="text-xs text-slate-500 mt-4">{t('bulkWarning')}</p>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Left Col: Image & AI Notes */}
              <div className="space-y-4 md:space-y-6">
                <div className="bg-slate-100 rounded-xl p-2 flex items-center justify-center h-48 md:h-64">
                  {imagePreview && <img src={imagePreview} alt="Item" className="max-h-full max-w-full object-contain rounded-lg shadow-sm" />}
                </div>
                
                <div className="bg-blue-50 rounded-xl p-4 md:p-5 border border-blue-100">
                  <h4 className="flex items-center gap-2 text-sm md:text-base font-semibold text-blue-900 mb-2 md:mb-3">
                    <Search size={16} className="md:w-[18px] md:h-[18px]" /> {t('aiMarketResearch')}
                  </h4>
                  <p className="text-xs md:text-sm text-blue-800 leading-relaxed whitespace-pre-wrap">
                    {researchNotes || t('noResearchNotes')}
                  </p>
                  
                  {groundingUrls.length > 0 && (
                    <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-blue-200/50">
                      <h5 className="text-[10px] md:text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1.5 md:mb-2">{t('sources')}</h5>
                      <ul className="space-y-1 md:space-y-1.5">
                        {groundingUrls.map((url, idx) => (
                          <li key={idx} className="text-xs md:text-sm truncate">
                            <a href={url.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-blue-400 inline-block"></span>
                              {url.title || url.uri}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Col: Form */}
              <div className="space-y-4 md:space-y-5">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1">{t('name')}</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 md:p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm md:text-base"
                  />
                </div>
                
                <div>
                  <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1">{t('category')}</label>
                  <input 
                    type="text" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 md:p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1">{t('description')}</label>
                  <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full p-2 md:p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none resize-none text-sm md:text-base"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1">{t('condition')}</label>
                    <select 
                      value={condition} 
                      onChange={(e) => setCondition(e.target.value)}
                      className="w-full p-2 md:p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm md:text-base"
                    >
                      <option>{t('mintNew')}</option>
                      <option>{t('excellent')}</option>
                      <option>{t('good')}</option>
                      <option>{t('fair')}</option>
                      <option>{t('poor')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-slate-700 mb-1">{t('estValue')} ($)</label>
                    <input 
                      type="number" 
                      value={estimatedValue || ''} 
                      onChange={(e) => setEstimatedValue(Number(e.target.value))}
                      placeholder="0.00"
                      className="w-full p-2 md:p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none text-sm md:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 'review' && (
          <div className="p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex flex-col-reverse sm:flex-row justify-end gap-2 md:gap-3">
            <button 
              onClick={() => setStep('upload')}
              className="w-full sm:w-auto px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors text-sm md:text-base"
            >
              {t('startOver')}
            </button>
            <button 
              onClick={handleSaveSingle}
              className="w-full sm:w-auto bg-brand-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <CheckCircle2 size={18} /> {t('saveItem')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddItemModal;
