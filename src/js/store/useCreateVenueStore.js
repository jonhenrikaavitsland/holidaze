import { create } from "zustand";

const useCreateVenueStore = create((set) => ({
  // Initial states for amenities
  wifi: false,
  breakfast: false,
  parking: false,
  pets: false,

  // Toggle functions for amenities
  toggleWifi: () => set((state) => ({ wifi: !state.wifi })),
  toggleBreakfast: () => set((state) => ({ breakfast: !state.breakfast })),
  toggleParking: () => set((state) => ({ parking: !state.parking })),
  togglePets: () => set((state) => ({ pets: !state.pets })),
}));

export default useCreateVenueStore;
