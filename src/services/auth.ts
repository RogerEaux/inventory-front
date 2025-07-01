import { auth } from '@/firebase';
import {
  signInWithEmailAndPassword,
  onIdTokenChanged,
  type User,
} from 'firebase/auth';

export const login = async (email: string, password: string) =>
  await signInWithEmailAndPassword(auth, email, password);

export const listenToAuthChange = (callback: (user: User | null) => void) =>
  onIdTokenChanged(auth, callback);

export const logout = async () => await auth.signOut();
