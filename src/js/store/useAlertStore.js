import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAlertStore = create(
  persist(
    (set) => ({
      title: "",
      message: "",
      type: "",
      className: "",
      onOk: null,
      onCancel: null,
      setAlert: (title, message, type, onOk, onCancel, className) => {
        set({ title, message, type, onOk, onCancel, className });
      },
      updateMessage: (message) => {
        set({ message });
      },
      updateSuccess: (message, type) => {
        set({ message, type });
      },
      clearAlert: () => {
        set({
          title: "",
          message: "",
          type: "",
          className: "",
          onOk: null,
          onCancel: null,
        });
      },
    }),
    {
      name: "alert",
    },
  ),
);

export default useAlertStore;
