/**
 * Filters an array of data items by comparing each item's city with the provided active location.
 *
 * If the `activeButton` parameter is empty, equal to "all destinations", undefined, or null,
 * the function returns undefined without filtering. Otherwise, it replaces any hyphens in the `activeButton`
 * string with spaces, converts it to lowercase, and returns an array of data items whose `location.city`
 * (in lowercase) exactly matches the processed `activeButton` value. If no items match the filter, the function returns undefined.
 *
 * @param {Array<Object>} data - The array of data items to be filtered. Each item is expected to have a `location` object with a `city` property.
 * @param {string} activeButton - The active location filter string, which may include hyphens that will be replaced with spaces.
 * @returns {Array<Object>|undefined} An array of filtered data items matching the location, or undefined if the filter is not applied or no matches are found.
 */
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
