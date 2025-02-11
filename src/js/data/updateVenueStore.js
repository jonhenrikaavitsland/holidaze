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
