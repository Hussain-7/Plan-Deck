import { create } from "zustand";
interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  login: async (user) => {
    set({
      user: {
        ...user,
      },
    });
  },
  logout: async () => {
    set({
      user: null,
    });
  },
}));
