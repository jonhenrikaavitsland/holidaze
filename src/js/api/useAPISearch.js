import { useEffect } from "react";
import { useState } from "react";

export function useAPISearch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!url) {
      setData([]);
      setIsLoading(false);
      setIsError(false);
      return; // Abort if url is null or undefined
    }

    let abortController = new AbortController(); // Creates an AbortController to handle cancellations

    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);

        const fetchedData = await fetch(url);
        const json = await fetchedData.json();
        const { meta, data: initialData } = json;

        if (!meta || meta.pageCount <= 1) {
          setData(initialData);
          return;
        }

        const allData = [...initialData];

        const fetchPromises = [];

        for (let i = 2; i <= meta.pageCount; i++) {
          fetchPromises.push(
            fetch(`${url}&page=${i}`).then((res) => res.json()),
          );
        }

        const results = await Promise.all(fetchPromises);

        results.forEach((result) => {
          if (result.data) {
            allData.push(...result.data);
          }
        });

        setData(allData);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();

    return () => {
      abortController.abort(); // Cleanup by aborting any ongoing fetch requests
    };
  }, [url]);

  return { data, isLoading, isError };
}
