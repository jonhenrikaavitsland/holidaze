import { useState } from "react";
import { apiKey, apiUrl, venuesPath } from "../data/constants";
import useAuthStore from "../store/useAuthStore";

const useDeleteVenue = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuthStore();

  const deleteVenue = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}${venuesPath}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });
      // Check if the deletion was successful (204 No Content)
      if (response.status === 204) {
        return true;
      } else {
        throw new Error(
          `Failed to delete venue. Status code: ${response.status}`,
        );
      }
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return { deleteVenue, loading, error };
};

export default useDeleteVenue;
