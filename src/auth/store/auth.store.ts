import type { User } from '@/interfaces/user.interface';
import { create } from 'zustand'
import { loginAction } from '../actions/login.actions';

type AuthState = {
    //properties
    user: User | null,
    token: string | null,
    //getters

    //actions
    login:(email:string, password:string) => Promise<boolean>
};

export const useAuthStore = create<AuthState>()((set) => ({
  //implement
    user: null,
  token:null,

  //actions
  login: async (email: string, password: string) => {
    console.log({ email, password });

    try {
      const data = await loginAction(email, password);
      localStorage.setItem('token', data.token);

      set({ user: data.user, token: data.token, authStatus: 'authenticated' });

      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, authStatus: 'not-authenticated' });
      return false;
    }
  },

}))