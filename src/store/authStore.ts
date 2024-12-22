import { create } from 'zustand';
import type { AuthState } from '../types/auth';

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
}));

export default useAuthStore;