export default function updateVenueStore(
  venueObj,
  { setRating, setWifi, setParking, setPets, setBreakfast },
) {
  if (!venueObj) return;

  setRating(venueObj?.rating);
  setWifi(venueObj?.meta?.wifi);
  setParking(venueObj?.meta?.parking);
  setBreakfast(venueObj?.meta?.breakfast);
  setPets(venueObj?.meta?.pets);
}
