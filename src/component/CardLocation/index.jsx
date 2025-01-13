/* eslint-disable react/prop-types */
import imageCorralejo from "../../data/locations/images/corralejo_1.jpg";
import imageCostaCalma from "../../data/locations/images/costa-calma_1.jpg";
import imageCaletaDeFuste from "../../data/locations/images/caleta_1.jpg";
import imageMorroJable from "../../data/locations/images/morro_1.jpg";
import imageElCotillo from "../../data/locations/images/cotillo_1.jpg";

export default function CardLocation({ location }) {
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
      className={`grid grid-rows-locationCard md:grid-rows-locationCardMd bg-cover bg-no-repeat bg-center h-70 md:h-120 cursor-pointer lg:rounded-xl relative lg:hover:w-screen lg:min-w-0`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <figure className="p-2.5 md:p-7.5">
        <img
          src="/logo_white_200.png"
          alt="white sun"
          className="h-13 w-13 md:h-25 md:w-25"
        />
      </figure>
      <div className="flex flex-col items-end justify-end">
        <div className="bg-custom-coral text-white font-serif font-bold text-lg-leading-none md:text-2xl-leading-none py-4 px-5 md:px-7.5 md:py-5 w-48 md:w-64">
          <h3>{location.name}</h3>
        </div>
      </div>
    </section>
  );
}
