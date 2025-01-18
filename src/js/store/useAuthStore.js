import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      login: (name, email, avatar, token) => {
        set({ user: { name, email, avatar }, token, isLoggedIn: true });
      },
      logout: () => {
        set({ user: null, token: null, isLoggedIn: false });
      },
    }),
    {
      name: "auth",
    },
  ),
);

export default useAuthStore;
