/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import BreadCrumb from "../../component/Breadcrumb";
import Heading from "../../component/Heading";
import { useEffect, useState } from "react";
import Loader from "../../component/Loader";
import CardLocation from "../../component/CardLocation";
import { useAPISearch } from "../../js/api/useAPISearch";
import { apiUrl, venuesPath } from "../../js/data/constants";
import CardVenue from "../../component/CardVenue";

export default function LocationPage() {
  const { locationName } = useParams();
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data,
    isLoading: loading,
    isError,
  } = useAPISearch(`${apiUrl}${venuesPath}/search?q=${locationName}`);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch("/src/data/locations/locations.json");
        const data = await response.json();

        const matchedLocation = data.find(
          (location) =>
            location.name.toLowerCase().replace(/\s+/g, "-") === locationName,
        );

        setLocationData(matchedLocation || null);
      } catch (error) {
        console.error("Error fetching locations", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationData();
  }, [locationName]);

  // While loading, avoid rendering anything that relies on locationData
  if (isLoading) {
    return (
      <div className="flex justify-center pt-20">
        <Loader />
      </div>
    );
  }

  // If no matching location is found
  if (!locationData) {
    return (
      <p className="text-center text-custom-coral font-bold md:text-lg lg:text-xl mx-5 md:mx-7.5 lg:mx-10">
        Oops... Location not found.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-10 md:gap-15 lg:gap-20 mb-10 md:mb-15 lg:mb-20">
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <BreadCrumb />
        <Heading
          level="1"
          className="text-center text-deep-blue mx-5 md:mx-7.5 lg:mx-10"
        >
          {`Explore ${locationData.name}`}
        </Heading>
        <CardLocation location={locationData} />
        <p className="mx-5 md:mx-7.5 lg:mx-10">{locationData.description}</p>
      </section>
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <Heading
          level="2"
          className="text-center text-deep-blue mx-5 md:mx-7.5 lg:mx-10"
        >{`4 Things to see and do in ${locationData.name}`}</Heading>
        {locationData["four-things"].map((thing, index) => (
          <FourThings key={index} thing={thing} index={index} />
        ))}
      </section>
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <Heading
          level="2"
          className="text-center text-deep-blue"
        >{`Available venues in ${locationData.name}`}</Heading>
        <div className="lg:grid lg:grid-cols-2 lg:gap-10 lg:mx-10">
          {isError ? (
            <p className="font-bold text-custom-coral text-center">
              Something went wrong fetching venues!
            </p>
          ) : loading ? (
            <Loader />
          ) : (
            data &&
            data.map((venue, index) => {
              // Check if the number of venues is odd and if this is the last item
              const isLastOdd =
                data.length % 2 === 1 && index === data.length - 1;
              return (
                <CardVenue
                  key={venue.id}
                  venue={venue}
                  className={isLastOdd ? "lg:col-span-full" : ""}
                />
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}

function FourThings({ thing, index }) {
  // Determine the grid positioning based on the index
  const gridClasses =
    index % 2 === 1
      ? "lg:col-start-2 lg:col-end-3"
      : "lg:col-start-1 lg:col-end-2";
  return (
    <div className="flex flex-col gap-3.75 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:mx-10 lg:gap-x-10 lg:gap-y-5">
      <Heading level="3" className="mx-5 md:mx-7.5 lg:mx-0">
        {thing.title}
      </Heading>
      <img
        src={thing.image.url}
        alt={thing.image.alt}
        className={`sm:mx-0 mx-5 md:mx-7.5 lg:mx-0 ${gridClasses} row-span-full`}
      />
      <p className="mx-5 md:mx-7.5 lg:mx-0 md:text-lg lg:text-xl">
        {thing.description}
      </p>
    </div>
  );
}
