/* eslint-disable react/prop-types */
import { useState } from "react";
import IconSun from "../IconSun";
import NamePlate from "../NamePlate";
import { useNavigate } from "react-router-dom";

/**
 * Renders a clickable venue card that displays a background image, an interactive sun icon, and a name plate overlay.
 *
 * The component uses the first media URL from the venue object as the background image. It shows a sun icon that responds to hover
 * events and displays a name plate containing venue details. Clicking the card navigates the user to the venue's detail page.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.venue - An object containing the venue's data.
 * @param {string} props.venue.id - The unique identifier for the venue used for navigation.
 * @param {Array} props.venue.media - An array of media objects, where the first media object's `url` property is used as the background image.
 * @param {string} [props.className] - Optional additional CSS classes to customize the styling of the venue card.
 *
 * @example
 * // Example usage:
 * <CardVenue
 *   venue={{ id: "123", media: [{ url: "https://example.com/image.jpg" }], name: "Venue Name" }}
 *   className="custom-card-class"
 * />
 *
 * @returns {JSX.Element} The rendered venue card component.
 */

export default function CardVenue({ venue, className }) {
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  return (
    <div
      className={`bg-cover bg-no-repeat bg-center lg:rounded-xl h-56 md:h-110 lg:h-96 cursor-pointer shadow-md shadow-natural-charcoal/40 ${className} hover:contrast-125 grid grid-rows-locationCard md:grid-rows-locationCardMd`}
      style={{ backgroundImage: `url(${venue.media[0]?.url})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/venue/${venue.id}`)}
    >
      <IconSun isHovered={isHovered} />
      <NamePlate location={venue} />
    </div>
  );
}
