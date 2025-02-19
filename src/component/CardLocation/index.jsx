/* eslint-disable react/prop-types */
import imageCorralejo from "../../data/locations/images/corralejo_1.jpg";
import imageCostaCalma from "../../data/locations/images/costa-calma_1.jpg";
import imageCaletaDeFuste from "../../data/locations/images/caleta_1.jpg";
import imageMorroJable from "../../data/locations/images/morro_1.jpg";
import imageElCotillo from "../../data/locations/images/cotillo_1.jpg";
import { useState } from "react";
import IconSun from "../IconSun";
import NamePlate from "../NamePlate";
import { useNavigate } from "react-router-dom";

/**
 * Renders a clickable location card that displays an image background, sun icon, and name plate.
 *
 * The component maps the provided location's name to a corresponding image and uses it as the background.
 * It displays an overlay sun icon that reacts to hover state and a name plate with the location details.
 * When the card is clicked, it navigates to a URL derived from the location's name (converted to lowercase
 * and with spaces replaced by hyphens).
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.location - An object representing the location details.
 * @param {string} props.location.name - The name of the location used to select the background image and generate the navigation URL.
 * @param {string} [props.className] - Optional additional CSS classes for custom styling of the card.
 *
 * @example
 * // Example usage:
 * <CardLocation location={{ name: "Corralejo", ...otherLocationData }} className="custom-class" />
 *
 * @returns {JSX.Element} The rendered location card component.
 */
export default function CardLocation({ location, className }) {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const imageMapping = {
    Corralejo: imageCorralejo,
    "Costa Calma": imageCostaCalma,
    "Caleta de Fuste": imageCaletaDeFuste,
    "Morro Jable": imageMorroJable,
    "El Cotillo": imageElCotillo,
  };
  // These images has their source and author information listed in /src/data/locations/locations.json
  // These images may be altered to be less than 200kb as well as had their DPI set to 72.

  const image = imageMapping[location.name];

  return (
    <section
      className={`grid grid-rows-locationCard md:grid-rows-locationCardMd bg-cover bg-no-repeat bg-center h-70 md:h-120 cursor-pointer lg:rounded-xl shadow-md shadow-natural-charcoal/40 ${className} hover:contrast-125`}
      style={{ backgroundImage: `url(${image})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() =>
        navigate(
          `/locations/${location.name.toLowerCase().replace(/\s+/g, "-")}`,
        )
      }
    >
      <IconSun isHovered={isHovered} />
      <NamePlate location={location} />
    </section>
  );
}
