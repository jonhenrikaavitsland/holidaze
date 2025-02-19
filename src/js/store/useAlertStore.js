import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * A Zustand store for managing alert state with persistence.
 *
 * This store holds alert properties such as title, message, type, className, success status,
 * and callback functions for "ok" and "cancel" actions. It provides methods to:
 * - Set a new alert with `setAlert`.
 * - Update just the message with `updateMessage`.
 * - Update the message, type, and success status with `updateSuccess`.
 * - Clear the current alert with `clearAlert`.
 *
 * The store is persisted using the key "alert".
 *
 * @module useAlertStore
 */
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
