import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { apiKey, apiUrl, profilesPath } from "../data/constants";

/**
 * Custom hook for fetching the current authenticated user's bookings.
 *
 * This hook retrieves the bookings data by making a GET request to the user's profile endpoint with
 * the `_bookings=true` query parameter. It sorts the fetched bookings by their starting date (`dateFrom`)
 * and manages loading and error states throughout the fetch process.
 *
 * @component
 * @example
 * // Example usage:
 * const { bookings, loading, error } = useUserBookings();
 *
 * if (loading) return <div>Loading...</div>;
 * if (error) return <div>Error fetching bookings: {error.message}</div>;
 *
 * return (
 *   <ul>
 *     {bookings.map((booking) => (
 *       <li key={booking.id}>{booking.dateFrom} - {booking.dateTo}</li>
 *     ))}
 *   </ul>
 * );
 *
 * @returns {object} An object containing:
 *   - {Array} bookings - The sorted array of booking objects for the authenticated user.
 *   - {boolean} loading - Indicates whether the bookings data is currently being fetched.
 *   - {Error|null} error - Contains the error object if an error occurred during the fetch, otherwise null.
 */
export default function useUserBookings() {
  const { user, token } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !token) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const url = `${apiUrl}${profilesPath}/${user.name}?_bookings=true`;

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": apiKey,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching bookings");
        }

        const data = await response.json();

        const unsortedBookings = data.data.bookings || [];
        const sortedBookings = unsortedBookings.sort(
          (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom),
        );

        setBookings(sortedBookings);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, token]);

  return { bookings, loading, error };
}
