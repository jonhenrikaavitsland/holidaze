import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { apiKey, apiUrl, profilesPath } from "../data/constants";

export default function useUserBookings() {
  const { user, token } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if we have a valid user and token.
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

        // Assuming that the returned profile includes a bookings property when using the query param.
        const unsortedBookings = data.data.bookings || [];

        // Sort the bookings array by dateFrom.
        const sortedBookings = unsortedBookings.sort(
          (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom),
        );

        setBookings(sortedBookings);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, token]);

  return { bookings, loading, error };
}
