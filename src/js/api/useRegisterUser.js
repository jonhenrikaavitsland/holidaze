import { useCallback, useState } from "react";
import { apiKey, apiUrl, registerPath } from "../data/constants";
import useAlertStore from "../store/useAlertStore";
import useUIStore from "../store/useUIStore";

export function useRegisterUser() {
  const [loading, setLoading] = useState(false);
  const { setAlert, clearAlert } = useAlertStore();
  const { closeAll, checkAndCloseAll, openStateWithOverlay } = useUIStore();

  const handleOk = () => {
    clearAlert();
    closeAll();
  };

  const registerUser = useCallback(async (name, email, password, manager) => {
    const url = apiUrl + registerPath;

    const requestBody = {
      name,
      email,
      password,
      avatar: {
        url: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Manila_dwarf_coconut_palm.jpg",
        alt: "me as a palm",
      },
      venueManager: manager,
    };
    // image is available under the CCO creative license and has not been altered.

    setLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        const errorMessage = (errorData && errorData.message) || "Login Failed";

        const errorToThrow = new Error(errorMessage);
        errorToThrow.status = response.status;
        errorToThrow.data = errorData;

        setTimeout(() => {
          checkAndCloseAll();
          setAlert(
            errorToThrow.data?.status,
            errorToThrow.data.errors[0]?.message,
            "ok-only",
            handleOk,
            "",
            "bg-custom-coral text-white",
          );
          setTimeout(() => {
            openStateWithOverlay("isAlertModalOpen");
          }, 1000);
        }, 500);

        throw errorToThrow;
      }

      const responseData = await response.json();
      return responseData;
    } catch (err) {
      console.error(err.message, err.status, err.data);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { registerUser, loading };
}
