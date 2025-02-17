/* eslint-disable react/prop-types */
import Heading from "../../../Heading";

// Import images used in four-things from all locations
import corralejo_2 from "/src/data/locations/images/corralejo_2.jpg";
import corralejo_3 from "/src/data/locations/images/corralejo_3.jpg";
import corralejo_4 from "/src/data/locations/images/corralejo_4.jpg";
import corralejo_5 from "/src/data/locations/images/corralejo_5.jpg";

import costaCalma_2 from "/src/data/locations/images/costa-calma_2.jpg";
import costaCalma_3 from "/src/data/locations/images/costa-calma_3.jpg";
import costaCalma_4 from "/src/data/locations/images/costa-calma_4.jpg";
import costaCalma_5 from "/src/data/locations/images/costa-calma_5.jpg";

import caleta_2 from "/src/data/locations/images/caleta_2.jpg";
import caleta_3 from "/src/data/locations/images/caleta_3.jpg";
import caleta_4 from "/src/data/locations/images/caleta_4.jpg";
import caleta_5 from "/src/data/locations/images/caleta_5.jpg";

import morro_2 from "/src/data/locations/images/morro_2.jpg";
import morro_3 from "/src/data/locations/images/morro_3.jpeg";
import morro_4 from "/src/data/locations/images/morro_4.jpg";
import morro_5 from "/src/data/locations/images/morro_5.jpg";

import cotillo_2 from "/src/data/locations/images/cotillo_2.jpg";
import cotillo_3 from "/src/data/locations/images/cotillo_3.jpg";
import cotillo_4 from "/src/data/locations/images/cotillo_4.jpg";
import cotillo_5 from "/src/data/locations/images/cotillo_5.jpg";

const imagesMapping = {
  "/src/data/locations/images/corralejo_2.jpg": corralejo_2,
  "/src/data/locations/images/corralejo_3.jpg": corralejo_3,
  "/src/data/locations/images/corralejo_4.jpg": corralejo_4,
  "/src/data/locations/images/corralejo_5.jpg": corralejo_5,
  "/src/data/locations/images/costa-calma_2.jpg": costaCalma_2,
  "/src/data/locations/images/costa-calma_3.jpg": costaCalma_3,
  "/src/data/locations/images/costa-calma_4.jpg": costaCalma_4,
  "/src/data/locations/images/costa-calma_5.jpg": costaCalma_5,
  "/src/data/locations/images/caleta_2.jpg": caleta_2,
  "/src/data/locations/images/caleta_3.jpg": caleta_3,
  "/src/data/locations/images/caleta_4.jpg": caleta_4,
  "/src/data/locations/images/caleta_5.jpg": caleta_5,
  "/src/data/locations/images/morro_2.jpg": morro_2,
  "/src/data/locations/images/morro_3.jpeg": morro_3,
  "/src/data/locations/images/morro_4.jpg": morro_4,
  "/src/data/locations/images/morro_5.jpg": morro_5,
  "/src/data/locations/images/cotillo_2.jpg": cotillo_2,
  "/src/data/locations/images/cotillo_3.jpg": cotillo_3,
  "/src/data/locations/images/cotillo_4.jpg": cotillo_4,
  "/src/data/locations/images/cotillo_5.jpg": cotillo_5,
};

export default function FourThings({ thing, index }) {
  // Determine the grid positioning based on the index
  const gridClasses =
    index % 2 === 1
      ? "lg:col-start-2 lg:col-end-3"
      : "lg:col-start-1 lg:col-end-2";

  // Look up the correct image based on thing.image.url from the mapping
  const imageSrc = imagesMapping[thing.image.url];

  return (
    <div className="flex flex-col gap-3.75 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:mx-10 lg:gap-x-10 lg:gap-y-5">
      <Heading level="3" className="mx-5 md:mx-7.5 lg:mx-0">
        {thing.title}
      </Heading>
      <img
        src={imageSrc}
        alt={thing.image.alt}
        loading="lazy"
        className={`sm:mx-0 mx-5 md:mx-7.5 lg:mx-0 ${gridClasses} row-span-full md:max-h-110 md:object-cover lg:h-110 lg:w-165`}
      />
      {/* images used are referenced in /src/data/locations/locations.json, images may be altered to be 200kb or less or have had their DPI set to 72 */}
      <p className="mx-5 md:mx-7.5 lg:mx-0 md:text-lg lg:text-xl">
        {thing.description}
      </p>
    </div>
  );
}
