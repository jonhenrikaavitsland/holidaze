import { useParams } from "react-router-dom";
import BreadCrumb from "../../component/Breadcrumb";
import Heading from "../../component/Heading";
import { useEffect, useState } from "react";
import Loader from "../../component/Loader";
import CardLocation from "../../component/CardLocation";

export default function LocationPage() {
  const { locationName } = useParams();
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    <div>
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <BreadCrumb />
        <Heading level="1" className="text-center text-deep-blue">
          {`Explore ${locationData.name}`}
        </Heading>
        <CardLocation location={locationData} />
      </section>
    </div>
  );
}
