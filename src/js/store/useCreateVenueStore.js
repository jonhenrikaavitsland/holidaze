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

      venue: "",
      address: "",
      location: "",
      zipCode: "",
      price: "",
      rating: 1,
      sleeps: "",

      setVenue: (value) => set(() => ({ venue: value })),
      setAddress: (value) => set(() => ({ address: value })),
      setLocation: (value) => set(() => ({ location: value })),
      setZipCode: (value) => set(() => ({ zipCode: value })),
      setPrice: (value) => set(() => ({ price: value })),
      setRating: (value) => set(() => ({ rating: value })),
      setSleeps: (value) => set(() => ({ sleeps: value })),

      "media-0": "",
      "media-1": "",
      "media-2": "",
      "media-3": "",
      "media-4": "",
      "media-5": "",
      "media-6": "",
      "media-7": "",
      "media-8": "",
      "media-9": "",

      setMedia: (index, value) => set(() => ({ [`media-${index}`]: value })),

      description: "",
      setDescription: (value) => set(() => ({ description: value })),

      clearAll: () =>
        set(() => ({
          wifi: false,
          breakfast: false,
          parking: false,
          pets: false,
          venue: "",
          address: "",
          location: "",
          zipCode: "",
          price: "",
          rating: 1,
          sleeps: "",
          "media-0": "",
          "media-1": "",
          "media-2": "",
          "media-3": "",
          "media-4": "",
          "media-5": "",
          "media-6": "",
          "media-7": "",
          "media-8": "",
          "media-9": "",
          description: "",
        })),
    }),
    {
      name: "createVenue",
    },
  ),
);

export default useCreateVenueStore;
