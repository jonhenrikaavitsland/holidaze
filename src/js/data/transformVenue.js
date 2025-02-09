import { locationsMap } from "./constants";

export default function transformVenue(venueObj) {
  const transformed = {
    venue: venueObj.name,
    address: venueObj.location?.address || "",
    zipCode: venueObj.location?.zip || "",
    price: venueObj.price,
    sleeps: venueObj.maxGuests,
    description: venueObj.description,
  };

  let locationNumber = null;
  for (const [key, locData] of Object.entries(locationsMap)) {
    if (
      venueObj.location?.city &&
      locData.city.toLowerCase() === venueObj.location.city.toLowerCase()
    ) {
      locationNumber = Number(key);
      break;
    }
  }
  transformed.location = locationNumber;

  if (Array.isArray(venueObj.media)) {
    venueObj.media.forEach((mediaItem, index) => {
      if (index < 10) {
        transformed[`media${index}`] = mediaItem.url || "";
      }
    });
  }

  return transformed;
}
