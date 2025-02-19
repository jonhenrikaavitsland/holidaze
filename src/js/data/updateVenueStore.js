/**
 * Updates the venue store state with data from a given venue object.
 *
 * If the provided `venueObj` is falsy, the function exits immediately. If `venueObj` is the string "reset",
 * the `clearAll` function is invoked to reset the venue store state. Otherwise, the function updates the venue store
 * with the venue's rating and meta information regarding amenities such as WiFi, parking, breakfast, and pets.
 *
 * @param {object|string} venueObj - The venue object containing updated venue details, or the string "reset" to clear the store.
 * @param {object} actions - An object containing setter functions for updating the venue store state.
 * @param {Function} actions.setRating - Function to update the venue's rating.
 * @param {Function} actions.setWifi - Function to update the venue's WiFi availability.
 * @param {Function} actions.setParking - Function to update the venue's parking availability.
 * @param {Function} actions.setPets - Function to update the venue's pet policy.
 * @param {Function} actions.setBreakfast - Function to update the venue's breakfast availability.
 * @param {Function} actions.clearAll - Function to reset the venue store state.
 *
 * @example
 * // Example usage:
 * updateVenueStore(venueData, {
 *   setRating: updateRating,
 *   setWifi: updateWifi,
 *   setParking: updateParking,
 *   setPets: updatePets,
 *   setBreakfast: updateBreakfast,
 *   clearAll: resetVenueStore,
 * });
 */
export default function updateVenueStore(
  venueObj,
  { setRating, setWifi, setParking, setPets, setBreakfast, clearAll },
) {
  if (!venueObj) return;

  if (venueObj === "reset") {
    clearAll();
  }

  setRating(venueObj?.rating);
  setWifi(venueObj?.meta?.wifi);
  setParking(venueObj?.meta?.parking);
  setBreakfast(venueObj?.meta?.breakfast);
  setPets(venueObj?.meta?.pets);
}
