import { type User } from '@/schemas/form/userSchema';
import { create } from 'zustand';

export interface UserFormState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserFormStore = create<UserFormState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
