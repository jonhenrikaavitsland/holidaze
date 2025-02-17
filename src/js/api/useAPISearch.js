import { useEffect, useState } from "react";
import { locationsMap } from "../data/constants";

// Constants for filtering
const TARGET_LOCATIONS = Object.values(locationsMap).map(({ lat, lng }) => ({
  lat,
  lng,
}));

/**
 * Custom React hook that fetches and filters data from an API endpoint with pagination support.
 *
 * This hook performs a fetch request to the provided URL and filters the returned data to include only those items
 * whose location matches one of the predefined target locations. If the API response indicates multiple pages of data
 * (via `meta.pageCount`), the hook will fetch all additional pages concurrently and merge the results.
 *
 * The hook manages and returns the following state:
 * - `data`: The filtered (and reversed) array of items that match the target locations.
 * - `isLoading`: A boolean indicating whether the fetch operation is in progress.
 * - `isError`: A boolean indicating whether an error occurred during fetching.
 * - `errorMessage`: A string containing the error message if an error occurred.
 *
 * If no URL is provided, the hook aborts the fetch process and resets all states.
 *
 * @param {string|null} url - The API endpoint URL to fetch data from.
 * @returns {object} An object containing:
 *   - {Array} data - The filtered and reversed array of data items.
 *   - {boolean} isLoading - Indicates if the data is currently being fetched.
 *   - {boolean} isError - Indicates if an error occurred during the fetch.
 *   - {string} errorMessage - The error message if an error occurred, otherwise an empty string.
 *
 * @example
 * // Usage example:
 * const { data, isLoading, isError, errorMessage } = useAPISearch("https://api.example.com/venues");
 */

export function useAPISearch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!url) {
      setData([]);
      setIsLoading(false);
      setIsError(false);
      setErrorMessage("");
      return; // Abort if url is null or undefined
    }

    const abortController = new AbortController();

    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");

        const fetchedData = await fetch(url, {
          signal: abortController.signal,
        });
        const json = await fetchedData.json();
        const { meta, data: initialData } = json;

        // Helper function to filter items by target locations
        const isTargetLocation = (item) =>
          item.location &&
          TARGET_LOCATIONS.some(
            (target) =>
              item.location.lat === target.lat &&
              item.location.lng === target.lng,
          );

        let filteredData = [];

        if (!meta || meta.pageCount <= 1) {
          filteredData = initialData.filter(isTargetLocation);
        } else {
          const allData = [...initialData];
          const fetchPromises = [];

          // Fetch additional pages if available
          for (let i = 2; i <= meta.pageCount; i++) {
            fetchPromises.push(
              fetch(`${url}&page=${i}`, {
                signal: abortController.signal,
              }).then((res) => res.json()),
            );
          }

          const results = await Promise.all(fetchPromises);

          results.forEach((result) => {
            if (result.data) {
              allData.push(...result.data);
            }
          });

          filteredData = allData.filter(isTargetLocation);
        }

        // If no venues matched, set the error message.
        if (filteredData.length === 0) {
          setIsError(true);
          setErrorMessage("No venues matched the search. Please try again.");
          // Optionally, clear any previous data:
          setData([]);
        } else {
          // Reverse the order as before and set the data.
          setData(filteredData.reverse());
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        console.error(error);
        setIsError(true);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getData();

    // Cleanup function to cancel ongoing fetch requests.
    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isLoading, isError, errorMessage };
}
