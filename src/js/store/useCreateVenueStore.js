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

  // Additional states
  venue: "",
  address: "",
  location: "",
  zipCode: "",
  price: 0,
  rating: 1,
  sleeps: 0,

  // Setters for form inputs
  setVenue: (value) => set(() => ({ venue: value })),
  setAddress: (value) => set(() => ({ address: value })),
  setLocation: (value) => set(() => ({ location: value })),
  setZipCode: (value) => set(() => ({ zipCode: value })),
  setPrice: (value) => set(() => ({ price: value })),
  setRating: (value) => set(() => ({ rating: value })),
  setSleeps: (value) => set(() => ({ sleeps: value })),
}));

export default useCreateVenueStore;
