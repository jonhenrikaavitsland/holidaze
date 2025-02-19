import { useCallback, useState } from "react";
import { apiKey, apiUrl, registerPath } from "../data/constants";
import useAlertStore from "../store/useAlertStore";
import useUIStore from "../store/useUIStore";

/**
 * Custom hook for registering a new user via an API call.
 *
 * This hook provides a `registerUser` function that sends a POST request with the user's details (name, email, password,
 * and a flag indicating if the user is a venue manager) to the registration endpoint. The request payload includes a
 * default avatar and other user information. In case of an error, it handles the response by setting alerts and updating
 * the UI state. The hook also manages a loading state during the API request.
 *
 * @component
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {boolean} manager - Indicates whether the user is registering as a venue manager.
 *
 * @example
 * // Example usage:
 * const { registerUser, loading } = useRegisterUser();
 *
 * async function handleRegister() {
 *   try {
 *     const response = await registerUser("John Doe", "john@example.com", "password123", true);
 *     // Handle successful registration with response data
 *   } catch (error) {
 *     // Error is handled via UI alerts
 *   }
 * }
 *
 * @returns {object} An object containing:
 *   - {Function} registerUser - Async function to register a new user.
 *   - {boolean} loading - Indicates whether the registration request is in progress.
 */
export function useRegisterUser() {
  const [loading, setLoading] = useState(false);
  const { setAlert, clearAlert } = useAlertStore();
  const { closeAll, checkAndCloseAll, openStateWithOverlay } = useUIStore();

  const registerUser = useCallback(
    async (name, email, password, manager) => {
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

      const handleOk = () => {
        clearAlert();
        closeAll();
      };

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

          const errorMessage =
            (errorData && errorData.message) || "Login Failed";

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
    },
    [checkAndCloseAll, clearAlert, closeAll, openStateWithOverlay, setAlert],
  );

  return { registerUser, loading };
}
