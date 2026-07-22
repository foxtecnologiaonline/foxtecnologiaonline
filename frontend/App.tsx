import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import AddItemModal from './components/AddItemModal';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import { Collection, CollectibleItem, User } from './types';
import { storageService } from './services/storage';
import { LanguageProvider } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [items, setItems] = useState<CollectibleItem[]>([]);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  
  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeCollectionIdForModal, setActiveCollectionIdForModal] = useState<string | undefined>();

  // Load auth state
  useEffect(() => {
    const currentUser = storageService.getCurrentUser();
    setUser(currentUser);
    setIsAuthChecked(true);
  }, []);

  // Load data when user changes
  useEffect(() => {
    if (user) {
      const userCollections = storageService.getCollections(user.id);
      setCollections(userCollections);
      const collectionIds = userCollections.map(c => c.id);
      setItems(storageService.getItems(collectionIds));
    } else {
      setCollections([]);
      setItems([]);
    }
  }, [user]);

  const handleLogin = useCallback(() => {
    setUser(storageService.getCurrentUser());
  }, []);

  const handleLogout = useCallback(() => {
    storageService.setCurrentUser(null);
    setUser(null);
  }, []);

  const handleCreateCollection = useCallback((name: string, description: string) => {
    if (!user) return;
    const newCollection: Collection = {
      id: `col_${Date.now()}`,
      userId: user.id,
      name,
      description,
      createdAt: Date.now(),
    };
    const updated = [...collections, newCollection];
    setCollections(updated);
    storageService.saveCollections(updated, user.id);
  }, [collections, user]);

  const handleSaveItem = useCallback((itemData: Omit<CollectibleItem, 'id' | 'createdAt'>) => {
    if (!user) return;
    const newItem: CollectibleItem = {
      ...itemData,
      id: `item_${Date.now()}`,
      createdAt: Date.now(),
    };
    const updated = [...items, newItem];
    setItems(updated);
    const collectionIds = collections.map(c => c.id);
    storageService.saveItems(updated, collectionIds);
  }, [items, collections, user]);

  const handleSaveMultipleItems = useCallback((itemsData: Omit<CollectibleItem, 'id' | 'createdAt'>[]) => {
    if (!user) return;
    const newItems: CollectibleItem[] = itemsData.map((data, index) => ({
      ...data,
      id: `item_${Date.now()}_${index}`,
      createdAt: Date.now(),
    }));
    const updated = [...items, ...newItems];
    setItems(updated);
    const collectionIds = collections.map(c => c.id);
    storageService.saveItems(updated, collectionIds);
  }, [items, collections, user]);

  const openAddItemModal = useCallback((collectionId?: string) => {
    setActiveCollectionIdForModal(collectionId);
    setIsAddModalOpen(true);
  }, []);

  if (!isAuthChecked) return null;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
        <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
        
        {/* Protected Routes */}
        <Route path="/*" element={
          user ? (
            <div className="flex h-screen overflow-hidden bg-slate-50">
              <Sidebar onLogout={handleLogout} />
              
              <main className="flex-1 overflow-y-auto">
                <Routes>
                  <Route 
                    path="/dashboard" 
                    element={<Dashboard collections={collections} items={items} user={user} />} 
                  />
                  <Route 
                    path="/collections" 
                    element={
                      <Collections 
                        collections={collections} 
                        items={items} 
                        onCreateCollection={handleCreateCollection} 
                      />
                    } 
                  />
                  <Route 
                    path="/collections/:id" 
                    element={
                      <CollectionDetail 
                        collections={collections} 
                        items={items} 
                        onOpenAddItem={openAddItemModal}
                      />
                    } 
                  />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </main>

              <AddItemModal 
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                collections={collections}
                onSave={handleSaveItem}
                onSaveMultiple={handleSaveMultipleItems}
                initialCollectionId={activeCollectionIdForModal}
              />
            </div>
          ) : (
            <Navigate to="/" />
          )
        } />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
