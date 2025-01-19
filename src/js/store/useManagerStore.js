import { create } from "zustand";

// This store is used to determine wether we are logging in as Manager or not using the same login function.
const useManagerStore = create((set) => ({
  isManager: false,
  setIsManager: (value) => set(() => ({ isManager: value })),
}));

export default useManagerStore;
