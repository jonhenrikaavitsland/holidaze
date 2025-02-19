import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { apiKey, apiUrl, profilesPath } from "../data/constants";

/**
 * Custom hook for fetching a user's venues profile with booking details.
 *
 * This hook sends a GET request to retrieve the venues associated with the currently authenticated user,
 * including booking information. It supports pagination via the `page` and `limit` parameters.
 * The hook returns the fetched venues, metadata about the request, and loading/error states.
 *
 * @component
 * @param {object} [options] - Optional parameters for pagination.
 * @param {number} [options.page=1] - The page number to fetch.
 * @param {number} [options.limit=100] - The maximum number of venues to fetch per page.
 *
 * @example
 * // Example usage:
 * const { venues, meta, loading, error } = useProfileVenues({ page: 1, limit: 50 });
 *
 * @returns {object} An object containing:
 *   - {Array} venues - An array of venue objects associated with the user.
 *   - {object|null} meta - Metadata about the fetched venues (e.g., total pages, count).
 *   - {boolean} loading - Indicates whether the data is currently being fetched.
 *   - {Error|null} error - Contains error details if the fetch fails, otherwise null.
 */
const useProfileVenues = ({ page = 1, limit = 100 } = {}) => {
  const [venues, setVenues] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, token } = useAuthStore();

  useEffect(() => {
    if (!user || !token) {
      setLoading(false);
      return;
    }

    const fetchVenues = async () => {
      setLoading(true);
      try {
        const url = new URL(
          `${apiUrl}${profilesPath}/${user.name}/venues?_bookings=true`,
        );
        url.searchParams.append("page", page);
        url.searchParams.append("limit", limit);

        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching venues: ${response.statusText}`);
        }

        const data = await response.json();

        setVenues(data.data);
        setMeta(data.meta);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, [user, token, page, limit]);

  return { venues, meta, loading, error };
};

export default useProfileVenues;
