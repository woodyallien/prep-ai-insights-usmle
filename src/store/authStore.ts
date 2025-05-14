
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          // This is a mock implementation. In a real app, this would be an API call.
          await new Promise(resolve => setTimeout(resolve, 1000));
          // Mock user data
          const user = { id: '123', email };
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      register: async (email, password, name) => {
        set({ isLoading: true });
        try {
          // This is a mock implementation. In a real app, this would be an API call.
          await new Promise(resolve => setTimeout(resolve, 1000));
          // Mock user data
          const user = { id: '123', email, name };
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      resetPassword: async (email) => {
        set({ isLoading: true });
        try {
          // This is a mock implementation. In a real app, this would be an API call.
          await new Promise(resolve => setTimeout(resolve, 1000));
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);
