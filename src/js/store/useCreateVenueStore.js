import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCreateVenueStore = create(
  persist(
    (set) => ({
      wifi: false,
      breakfast: false,
      parking: false,
      pets: false,

      toggleWifi: () => set((state) => ({ wifi: !state.wifi })),
      toggleBreakfast: () => set((state) => ({ breakfast: !state.breakfast })),
      toggleParking: () => set((state) => ({ parking: !state.parking })),
      togglePets: () => set((state) => ({ pets: !state.pets })),
      setWifi: (value) => set(() => ({ wifi: value })),
      setBreakfast: (value) => set(() => ({ breakfast: value })),
      setParking: (value) => set(() => ({ parking: value })),
      setPets: (value) => set(() => ({ pets: value })),

      chosenLocation: "",
      rating: 1,

      setChosenLocation: (value) => set(() => ({ chosenLocation: value })),
      setRating: (value) => set(() => ({ rating: value })),

      clearAll: () =>
        set({
          wifi: false,
          breakfast: false,
          parking: false,
          pets: false,
          chosenLocation: "",
          rating: 1,
        }),
    }),
    {
      name: "createVenue",
    },
  ),
);

export default useCreateVenueStore;
