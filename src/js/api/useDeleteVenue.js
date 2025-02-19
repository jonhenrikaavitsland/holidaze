import { useState } from "react";
import { apiKey, apiUrl, venuesPath } from "../data/constants";
import useAuthStore from "../store/useAuthStore";

/**
 * Custom hook for deleting a venue via an API call.
 *
 * This hook sends a DELETE request to remove a venue identified by its ID. It manages and returns
 * loading and error states associated with the deletion process. The request includes necessary
 * headers such as the content type, API key, and bearer token for authentication.
 *
 * @component
 * @example
 * // Example usage:
 * const { deleteVenue, loading, error } = useDeleteVenue();
 *
 * // To delete a venue with a given ID:
 * const success = await deleteVenue("venue-id-123");
 *
 * @returns {object} An object containing:
 *   - {Function} deleteVenue - Function to delete a venue. Accepts the venue ID as a parameter.
 *   - {boolean} loading - Indicates whether the deletion request is in progress.
 *   - {Error|null} error - Contains error details if the deletion fails, otherwise null.
 */
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
