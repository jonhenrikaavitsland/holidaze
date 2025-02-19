import { useState } from "react";
import { apiKey, apiUrl, loginPath } from "../data/constants";
import useAlertStore from "../store/useAlertStore";
import useUIStore from "../store/useUIStore";

/**
 * Custom hook for authenticating a user via an API call.
 *
 * This hook provides a `login` function that sends a POST request with the user's email and password
 * to the login endpoint. It handles error responses by setting alerts and managing UI state, and returns
 * user data upon a successful login. The hook also manages a loading state during the API request.
 *
 * @component
 * @example
 * // Example usage:
 * const { login, loading } = useLogin();
 *
 * async function handleLogin() {
 *   try {
 *     const userData = await login("user@example.com", "password123");
 *     // Use the returned userData (e.g., update auth state)
 *   } catch (error) {
 *     // Handle error (alert is automatically displayed by the hook)
 *   }
 * }
 *
 * @returns {object} An object containing:
 *   - {Function} login - Async function to authenticate the user. Accepts email and password as parameters and returns user data on success.
 *   - {boolean} loading - Indicates whether the login request is currently in progress.
 */
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAlert, clearAlert } = useAlertStore();
  const { closeAll, checkAndCloseAll, openStateWithOverlay } = useUIStore();

  const handleOk = () => {
    clearAlert();
    closeAll();
  };

  const login = async (emailAddress, password) => {
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}${loginPath}?_holidaze=true`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({ email: emailAddress, password }),
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

      const data = await response.json();
      const { name, email, avatar, accessToken, venueManager } = data.data;

      const userData = {
        name,
        email,
        avatar,
        token: accessToken,
        venueManager,
      };
      return userData;
    } catch (err) {
      console.error(err.message, err.status, err.data);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
