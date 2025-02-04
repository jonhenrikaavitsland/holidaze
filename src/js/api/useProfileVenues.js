import { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { apiKey, apiUrl, profilesPath } from "../data/constants";

const useProfileVenues = () => {
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
        const url = `${apiUrl}${profilesPath}/${user.name}/venues`;

        const response = await fetch(url, {
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
  }, [user, token]);

  return { venues, meta, loading, error };
};

export default useProfileVenues;
