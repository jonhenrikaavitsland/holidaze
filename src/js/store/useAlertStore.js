import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAlertStore = create(
  persist(
    (set) => ({
      title: "",
      message: "",
      type: "",
      onOk: null,
      onCancel: null,
      setAlert: (title, message, type, onOk, onCancel) => {
        set({ title, message, type, onOk, onCancel });
      },
      clearAlert: () => {
        set({
          title: "",
          message: "",
          type: "",
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
