import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * A Zustand store for managing venue creation state with persistence.
 *
 * This store handles state related to creating a venue, including:
 * - Amenities: wifi, breakfast, parking, and pets (boolean values).
 * - Chosen location: a string representing the selected location.
 * - Rating: a numeric value representing the venue's rating.
 *
 * The store provides actions to:
 * - Toggle the boolean states for each amenity using `toggleWifi`, `toggleBreakfast`, `toggleParking`, and `togglePets`.
 * - Set the values of each amenity using `setWifi`, `setBreakfast`, `setParking`, and `setPets`.
 * - Update the chosen location with `setChosenLocation`.
 * - Update the rating with `setRating`.
 * - Reset all venue creation state to their initial values with `clearAll`.
 *
 * The state is persisted under the key "createVenue".
 *
 * @module useCreateVenueStore
 */
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
