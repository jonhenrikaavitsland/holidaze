import { create } from "zustand";

/**
 * A Zustand store for managing UI state related to modals, menus, and overlays.
 *
 * This store maintains boolean flags for various UI components, including:
 * - `isOverlayOpen`: Whether the overlay is currently open.
 * - `isMenuOpen`: Whether the mobile menu is open.
 * - `isLoginModalOpen`: Whether the login modal is open.
 * - `isRegisterModalOpen`: Whether the register modal is open.
 * - `isEditProfileOpen`: Whether the edit profile modal is open.
 * - `isAlertModalOpen`: Whether the alert modal is open.
 *
 * The store provides the following actions:
 * - `openStateWithOverlay(stateKey)`: Opens the overlay and sets the specified state (e.g., `isMenuOpen`) to true.
 * - `closeAll()`: Closes all UI components by setting all flags to false.
 * - `checkAndCloseAll()`: Checks if any of the modals or the menu is open and, if so, closes them (except the alert modal).
 *
 * @module useUIStore
 */
const useUIStore = create((set) => ({
  isOverlayOpen: false,
  isMenuOpen: false,
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isEditProfileOpen: false,
  isAlertModalOpen: false,

  // Function to open a state and overlay together
  openStateWithOverlay: (stateKey) =>
    set(() => ({
      isOverlayOpen: true,
      [stateKey]: true,
    })),

  // Function to close everything
  closeAll: () =>
    set(() => ({
      isOverlayOpen: false,
      isMenuOpen: false,
      isLoginModalOpen: false,
      isRegisterModalOpen: false,
      isEditProfileOpen: false,
      isAlertModalOpen: false,
    })),

  // Utility to check if any state is open and close everything
  checkAndCloseAll: () =>
    set((state) => {
      if (
        state.isMenuOpen ||
        state.isLoginModalOpen ||
        state.isRegisterModalOpen ||
        state.isEditProfileOpen
      ) {
        return {
          isOverlayOpen: false,
          isMenuOpen: false,
          isLoginModalOpen: false,
          isRegisterModalOpen: false,
          isEditProfileOpen: false,
        };
      }
      return {}; // No state changes needed
    }),
}));

export default useUIStore;
