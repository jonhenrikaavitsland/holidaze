import { useEffect, useState } from "react";
import { locationsMap } from "../data/constants";

// Constants for filtering
const TARGET_LOCATIONS = Object.values(locationsMap).map(({ lat, lng }) => ({
  lat,
  lng,
}));

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
