import { create } from "zustand";

const useDataStore = create((set) => ({
  emailAddress: "",
  password: "",
  name: "",
  error: "",
  setEmailAddress: (emailAddress) => set({ emailAddress }),
  setPassword: (password) => set({ password }),
  setName: (name) => set({ name }),
  setError: (error) => set({ error }),
  clear: () =>
    set({
      emailAddress: "",
      password: "",
      name: "",
      error: "",
    }),
}));

export default useDataStore;
