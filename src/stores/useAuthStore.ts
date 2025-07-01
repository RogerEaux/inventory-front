import { create } from 'zustand';
import { type User } from 'firebase/auth';

export interface AuthState {
  user: User | null;
  token: string | null;
  roles: string[] | null;
  loading: boolean;
  setAuth: (state: Partial<AuthState>) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  roles: null,
  loading: true,
  setAuth: (state) => set((prev) => ({ ...prev, ...state })),
  resetAuth: () =>
    set({
      user: null,
      token: null,
      roles: null,
      loading: false,
    }),
}));
