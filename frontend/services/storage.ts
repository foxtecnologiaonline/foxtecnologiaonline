import { Collection, CollectibleItem, User } from '../types';

const COLLECTIONS_KEY = 'vault_collections';
const ITEMS_KEY = 'vault_items';
const USERS_KEY = 'vault_users';
const CURRENT_USER_KEY = 'vault_current_user';

export const storageService = {
  // Auth
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },
  saveUsers: (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },
  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  // Collections
  getCollections: (userId: string): Collection[] => {
    const data = localStorage.getItem(COLLECTIONS_KEY);
    const allCollections: Collection[] = data ? JSON.parse(data) : [];
    return allCollections.filter(c => c.userId === userId);
  },
  
  saveCollections: (collections: Collection[], userId: string) => {
    const data = localStorage.getItem(COLLECTIONS_KEY);
    let allCollections: Collection[] = data ? JSON.parse(data) : [];
    // Remove old collections for this user and append new ones
    allCollections = allCollections.filter(c => c.userId !== userId).concat(collections);
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(allCollections));
  },

  // Items
  getItems: (collectionIds: string[]): CollectibleItem[] => {
    const data = localStorage.getItem(ITEMS_KEY);
    const allItems: CollectibleItem[] = data ? JSON.parse(data) : [];
    return allItems.filter(item => collectionIds.includes(item.collectionId));
  },

  saveItems: (items: CollectibleItem[], collectionIds: string[]) => {
    const data = localStorage.getItem(ITEMS_KEY);
    let allItems: CollectibleItem[] = data ? JSON.parse(data) : [];
    // Remove old items for these collections and append new ones
    allItems = allItems.filter(item => !collectionIds.includes(item.collectionId)).concat(items);
    localStorage.setItem(ITEMS_KEY, JSON.stringify(allItems));
  }
};
