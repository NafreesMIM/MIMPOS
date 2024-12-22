export interface User {
  id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'shop_owner' | 'manager' | 'salesperson';
  shops: string[];
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}