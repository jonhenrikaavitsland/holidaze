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

// import { create } from "zustand";

// const useAuthStore = create((set) => ({
//   user: null,
//   token: null,
//   isLoggedIn: false,
//   login: (name, email, avatar, token) => {
//     // Update Zustand state
//     set({ user: { name, email, avatar }, token, isLoggedIn: true });
//     // Save to LocalStorage
//     localStorage.setItem(
//       "auth",
//       JSON.stringify({ user: { name, email, avatar }, token }),
//     );
//   },
//   logout: () => {
//     // Clear Zustand store
//     set({ user: null, token: null, isLoggedIn: false });
//     // Delete from LocalStorage
//     localStorage.removeItem("auth");
//   },
//   initializeAuth: () => {
//     // Check LocalStorage for saved auth data
//     const storedAuth = localStorage.getItem("auth");
//     if (storedAuth) {
//       const { user, token } = JSON.parse(storedAuth);
//       set({ user, token, isLoggedIn: true });
//     }
//   },
// }));

// export default useAuthStore;
