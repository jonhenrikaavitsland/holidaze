export function filterDataByLocation(data, activeButton) {
  if (
    activeButton === "" ||
    activeButton === "all destinations" ||
    activeButton === undefined ||
    activeButton === null
  ) {
    return;
  }

  activeButton = activeButton.replace(/-/g, " ");

  const filteredData = data.filter(
    (item) => item.location.city.toLowerCase() === activeButton,
  );

  if (filteredData.length === 0) {
    return;
  }

  return filteredData;
}
