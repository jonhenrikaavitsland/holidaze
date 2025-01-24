/* eslint-disable react/prop-types */
import { fallBackMap, locationsMap } from "../../js/data/constants";

export default function Map({ data }) {
  const location = Object.values(locationsMap).find(
    (loc) => loc.lat === data.location.lat && loc.lng === data.location.lng,
  );

  // Fallback URL if no match is found
  const mapUrl = location ? location.map : fallBackMap; // Default fallback map URL

  return (
    <iframe
      className="border-0 w-full md:h-110"
      src={mapUrl}
      width="400"
      height="300"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}
