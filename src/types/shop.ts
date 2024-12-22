export interface Shop {
  id: string;
  name: string;
  logo: string;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  owner: string;
  subscription: {
    plan: 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'expired' | 'cancelled';
    expiresAt: string;
  };
  settings: {
    currency: string;
    timezone: string;
    language: string;
  };
}