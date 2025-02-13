import { useCallback, useState } from "react";
import { apiKey, apiUrl, registerPath } from "../data/constants";

export function useRegisterUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setError(null);

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
        // Attempt to extract the error details from the response
        const errorData = await response.json().catch(() => null);

        const errorMessage = (errorData && errorData.message) || "Login Failed";

        const errorToThrow = new Error(errorMessage);
        errorToThrow.status = response.status;
        errorToThrow.data = errorData;

        throw errorToThrow;
      }

      const responseData = await response.json();
      return responseData;
    } catch (err) {
      console.error("An error occurred:", err.message);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { registerUser, loading, error };
}
