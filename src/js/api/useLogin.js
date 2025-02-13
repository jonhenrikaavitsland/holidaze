import { useState } from "react";
import { apiKey, apiUrl, loginPath } from "../data/constants";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (emailAddress, password) => {
    setLoading(true);
    setError(null);

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
        // Attempt to extract the error details from the response
        const errorData = await response.json().catch(() => null);

        const errorMessage = (errorData && errorData.message) || "Login Failed";

        const errorToThrow = new Error(errorMessage);
        errorToThrow.status = response.status;
        errorToThrow.data = errorData;

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
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err);
      console.error(err);
      throw err; // Optional: re-throw the error for further handling
    } finally {
      setLoading(false);
    }
  };

  return { login, user, loading, error };
};

export default useLogin;
