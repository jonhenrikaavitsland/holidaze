import { useState } from "react";
import { apiKey, apiUrl, profilesPath } from "../data/constants";

const useUpdateAvatar = () => {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [error, setError] = useState("");

  const updateAvatar = async (user, token, newImage) => {
    const endPoint = `${apiUrl}${profilesPath}/${user.name}`;

    try {
      const response = await fetch(endPoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: {
            url: newImage,
            alt: user.name,
          },
        }),
      });

      if (!response.ok) {
        // Attempt to extract the error details from the response
        const errorData = await response.json().catch(() => null);

        const errorMessage =
          (errorData && errorData.message) || "Updating Avatar failed";

        const errorToThrow = new Error(errorMessage);
        errorToThrow.status = response.status;
        errorToThrow.data = errorData;

        throw errorToThrow;
      }

      // If update is successful, update state.
      setUpdateSuccess(true);
      setError("");
    } catch (err) {
      setError(err.message);
      setUpdateSuccess(false);
      throw err;
    }
  };

  return { updateAvatar, updateSuccess, error };
};

export default useUpdateAvatar;
