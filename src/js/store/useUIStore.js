import { create } from "zustand";

const useUIStore = create((set) => ({
  isOverlayOpen: false,
  isMenuOpen: false,
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
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
      isAlertModalOpen: false,
    })),

  // Utility to check if any state is open and close everything
  checkAndCloseAll: () =>
    set((state) => {
      if (
        state.isMenuOpen ||
        state.isLoginModalOpen ||
        state.isRegisterModalOpen
      ) {
        return {
          isOverlayOpen: false,
          isMenuOpen: false,
          isLoginModalOpen: false,
          isRegisterModalOpen: false,
        };
      }
      return {}; // No state changes needed
    }),
}));

export default useUIStore;
