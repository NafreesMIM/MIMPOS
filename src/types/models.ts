// Core entity types
export interface Shop {
  id: string;
  name: string;
  logoUrl: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  ownerId: string;
  subscriptionPlan: 'basic' | 'premium' | 'enterprise';
  subscriptionStatus: 'active' | 'expired' | 'cancelled';
  subscriptionExpiresAt: string | null;
  currency: string;
  timezone: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  shopId: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  shopId: string;
  categoryId: string | null;
  name: string;
  description: string | null;
  sku: string | null;
  barcode: string | null;
  price: number;
  costPrice: number;
  taxRate: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}