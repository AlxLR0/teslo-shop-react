import type { User } from '@/interfaces/user.interface';
import { create } from 'zustand'
import { loginAction } from '../actions/login.actions';
import { checkAuthAction } from '../actions/check-auth.actions';
import { registerAction } from '../actions/register.actions';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
    //properties
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;

    //getters
    isAdmin: ()=> boolean;

    //actions
    login:(email:string, password:string) => Promise<boolean>
    register: (email:string, password:string, fullname:string) => Promise<boolean>
    logout:() => void;
    checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set,get) => ({
  //implement
    user: null,
  token:null,
  authStatus: 'checking',

  //getters
  isAdmin: ()=>{
    const roles = get().user?.roles || [];
    return roles.includes('admin');
  },

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
  register: async (email: string, password: string, fullname: string) => {
    console.log({ email, password, fullname });

    try {
      const data = await registerAction(email, password, fullname);
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

  

  logout: ()=>{
    localStorage.removeItem('token');
    set({ user: null, token: null, authStatus: 'not-authenticated'});

  },

  checkAuthStatus: async()=>{

    try{
      const{user,token}=await checkAuthAction();
      set({
        user: user,
        token: token,
        authStatus: 'authenticated'
      })
      return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(error){
      set({
        user: undefined,
        token: undefined,
        authStatus: 'not-authenticated'
      });
      return false;
    }
  }

}))