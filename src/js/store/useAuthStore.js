import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * A Zustand store for managing user authentication state with persistence.
 *
 * The store holds authentication-related data including:
 * - `user`: An object representing the authenticated user (with `name`, `email`, and `avatar` properties), or null if not authenticated.
 * - `token`: The authentication token as a string, or null if not authenticated.
 * - `isLoggedIn`: A boolean indicating whether the user is currently logged in.
 * - `isVenueManager`: A boolean indicating whether the logged-in user is a venue manager.
 *
 * It provides the following actions:
 * - `login(name, email, avatar, token, venueManager)`: Sets the authentication state for a logged-in user.
 * - `logout()`: Clears the authentication state, effectively logging the user out.
 * - `updateVenueManager(venueManager)`: Updates the venue manager status.
 * - `updateAvatarObject(newAvatar)`: Updates the user's avatar in the store.
 *
 * The store state is persisted under the key "auth".
 *
 * @module useAuthStore
 */
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
      updateAvatarObject: (newAvatar) => {
        set((state) => ({
          user: state.user ? { ...state.user, avatar: newAvatar } : null,
        }));
      },
    }),
    {
      name: "auth",
    },
  ),
);

export default useAuthStore;
