export async function fetchData(url, setFetchedData) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    const { meta, data: initialData } = data;

    if (!meta || meta.pageCount <= 1) {
      setFetchedData(initialData);
      return;
    }

    const allData = [...initialData];

    const fetchPromises = [];

    for (let i = 2; i <= meta.pageCount; i++) {
      fetchPromises.push(fetch(`${url}&page=${i}`).then((res) => res.json()));
    }

    const results = await Promise.all(fetchPromises);

    results.forEach((result) => {
      if (result.data) {
        allData.push(...result.data);
      }
    });

    setFetchedData(allData);
  } catch (error) {
    console.error(error);
  }
}
