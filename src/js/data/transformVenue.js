import { locationsMap } from "./constants";

/**
 * Transforms a venue object into a structured format suitable for further processing or form submission.
 *
 * The function extracts key properties from the input venue object, including name, address, zip code, price, guest capacity,
 * and description. It determines the venue's location number by matching the venue's city (case-insensitive) with entries in
 * the predefined `locationsMap`. It also maps up to the first 10 media items' URLs to corresponding keys (`media0` to `media9`).
 *
 * @param {object} venueObj - The original venue object.
 * @param {string} venueObj.name - The name of the venue.
 * @param {object} venueObj.location - The location details of the venue.
 * @param {string} [venueObj.location.address] - The address of the venue.
 * @param {string} [venueObj.location.zip] - The zip code of the venue.
 * @param {string} [venueObj.location.city] - The city where the venue is located.
 * @param {number} venueObj.price - The price of the venue.
 * @param {number} venueObj.maxGuests - The maximum number of guests the venue can accommodate.
 * @param {string} venueObj.description - A description of the venue.
 * @param {Array<Object>} [venueObj.media] - An array of media objects associated with the venue.
 * @param {string} venueObj.media[].url - The URL of a media item.
 *
 * @returns {object} A transformed venue object with the following properties:
 *   - {string} venue - The name of the venue.
 *   - {string} address - The venue's address.
 *   - {string} zipCode - The venue's zip code.
 *   - {number} price - The price of the venue.
 *   - {number} sleeps - The maximum number of guests.
 *   - {string} description - The description of the venue.
 *   - {number|null} location - The location number corresponding to the venue's city (or null if no match is found).
 *   - {string} media0, media1, ... media9 (optional) - The URLs of the first 10 media items, if available.
 *
 * @example
 * // Given a venue object:
 * const venueObj = {
 *   name: "Sunny Retreat",
 *   location: { address: "123 Beach Ave", zip: "90210", city: "Santa Monica" },
 *   price: 200,
 *   maxGuests: 4,
 *   description: "A beautiful seaside venue.",
 *   media: [
 *     { url: "https://example.com/image1.jpg" },
 *     { url: "https://example.com/image2.jpg" },
 *     // more media items...
 *   ],
 * };
 *
 * // Transform the venue object:
 * const transformedVenue = transformVenue(venueObj);
 * console.log(transformedVenue);
 */
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
