import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      isVenueManager: false,
      login: (name, email, avatar, token, venueManager) => {
        set({
          user: { name, email, avatar },
          token,
          isLoggedIn: true,
          isVenueManager: !!venueManager,
        });
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isLoggedIn: false,
          isVenueManager: false,
        });
      },
      updateVenueManager: (venueManager) => {
        set({
          isVenueManager: !!venueManager,
        });
      },
    }),
    {
      name: "auth",
    },
  ),
);

export default useAuthStore;
