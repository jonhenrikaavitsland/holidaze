/* eslint-disable react/prop-types */
import { useState } from "react";
import IconSun from "../IconSun";
import NamePlate from "../NamePlate";

export default function CardVenue({ venue, className }) {
  const [isHovered, setIsHovered] = useState(false);

  console.log("Venue:", venue);

  return (
    <div
      className={`bg-cover bg-no-repeat bg-center lg:rounded-xl h-56 md:h-110 lg:h-96 cursor-pointer shadow-md shadow-natural-charcoal/40 ${className} hover:contrast-125 grid grid-rows-locationCard md:grid-rows-locationCardMd`}
      style={{ backgroundImage: `url(${venue.media[0]?.url})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconSun isHovered={isHovered} />
      <NamePlate location={venue} />
    </div>
  );
}
