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
