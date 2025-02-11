import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAlertStore = create(
  persist(
    (set) => ({
      title: "",
      message: "",
      type: "",
      className: "",
      success: false,
      onOk: null,
      onCancel: null,
      setAlert: (title, message, type, onOk, onCancel, className) => {
        set({ title, message, type, onOk, onCancel, className });
      },
      updateMessage: (message) => {
        set({ message });
      },
      updateSuccess: (message, type, success) => {
        set({ message, type, success });
      },
      clearAlert: () => {
        set({
          title: "",
          message: "",
          type: "",
          className: "",
          success: false,
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
