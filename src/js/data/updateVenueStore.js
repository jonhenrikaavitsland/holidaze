export default function updateVenueStore(
  venueObj,
  {
    setVenue,
    setAddress,
    setChosenLocation,
    setZipCode,
    setPrice,
    setRating,
    setSleeps,
    setWifi,
    setParking,
    setPets,
    setBreakfast,
    setMedia,
    setDescription,
    clearAll,
  },
) {
  if (!venueObj) return;
  clearAll();

  setVenue(venueObj?.name);
  setAddress(venueObj?.location?.address);

  const cityMapping = {
    Corralejo: "1",
    "Costa Calma": "2",
    "Caleta de Fuste": "3",
    "Morro Jable": "4",
    "El Cotillo": "5",
  };
  setChosenLocation(cityMapping[venueObj?.location?.city]);

  setZipCode(venueObj?.location?.zip);
  setPrice(venueObj?.price);
  setRating(venueObj?.rating);
  setSleeps(venueObj?.maxGuests);
  setWifi(venueObj?.meta?.wifi);
  setParking(venueObj?.meta?.parking);
  setBreakfast(venueObj?.meta?.breakfast);
  setPets(venueObj?.meta?.pets);
  setDescription(venueObj?.description);

  if (venueObj?.media && Array.isArray(venueObj.media)) {
    venueObj.media.forEach((mediaItem, index) => {
      setMedia(index, mediaItem.url);
    });
  }
}
