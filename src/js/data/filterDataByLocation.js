export function filterDataByLocation(data, activeButton) {
  if (
    activeButton === "" ||
    activeButton === "all destinations" ||
    activeButton === undefined
  ) {
    return;
  }

  const filteredData = data.filter(
    (item) => item.location.city.toLowerCase() === activeButton,
  );

  if (filteredData.length === 0) {
    return;
  }

  return filteredData;
}
