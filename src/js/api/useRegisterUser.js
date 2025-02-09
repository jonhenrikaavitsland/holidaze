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
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        throw new Error(
          `Error ${response.status}: ${errorData.message || "Unknown error"}`,
        );
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
// export default async function registerUser(name, email, password, manager) {
//   const url = apiUrl + registerPath;

//   const requestBody = {
//     name,
//     email,
//     password,
//     avatar: {
//       url: "https://unsplash.com/photos/palm-tree--wapbtQueAE",
//       alt: "me as a palm",
//     },
//     venueManager: manager,
//   };

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Noroff-API-Key": apiKey,
//       },
//       body: JSON.stringify(requestBody),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       console.error("Registration failed:", error);
//       throw new Error(
//         `Error ${response.status}: ${error.message || "Unknown error"}`,
//       );
//     }
//   } catch (error) {
//     console.error("An error occurred:", error.message);
//     throw error;
//   }
// }
