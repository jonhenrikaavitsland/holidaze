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

      media0: "",
      media1: "",
      media2: "",
      media3: "",
      media4: "",
      media5: "",
      media6: "",
      media7: "",
      media8: "",
      media9: "",
      setMedia: (index, value) => set(() => ({ [`media${index}`]: value })),

      description: "",
      setDescription: (value) => set(() => ({ description: value })),

      clearAll: () =>
        set({
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
          media0: "",
          media1: "",
          media2: "",
          media3: "",
          media4: "",
          media5: "",
          media6: "",
          media7: "",
          media8: "",
          media9: "",
          description: "",
        }),
    }),
    {
      name: "createVenue",
    },
  ),
);

export default useCreateVenueStore;
