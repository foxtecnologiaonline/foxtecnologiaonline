export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Collection {
  id: string;
  userId: string;
  name: string;
  description: string;
  createdAt: number;
  coverImage?: string;
}

export interface GroundingUrl {
  uri: string;
  title: string;
}

export interface CollectibleItem {
  id: string;
  collectionId: string;
  name: string;
  description: string;
  category: string;
  condition: string;
  estimatedValue: number;
  priceResearchNotes: string;
  imageUrl: string;
  groundingUrls: GroundingUrl[];
  createdAt: number;
}

export interface AIIdentificationResult {
  name: string;
  description: string;
  category: string;
}

export interface AIPriceResearchResult {
  summary: string;
  urls: GroundingUrl[];
}

export type Language = 'en' | 'pt' | 'es';
