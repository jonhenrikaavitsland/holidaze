import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl, venuesPath } from "../../js/data/constants";
import Loader from "../../component/Loader";
import Carousel from "../../component/Carousel";
import BreadCrumb from "../../component/Breadcrumb";

export default function VenuePage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { venueId } = useParams();

  useEffect(() => {
    async function getData(url) {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url);
        const json = await response.json();

        setData(json.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData(`${apiUrl}${venuesPath}/${venueId}`);
  }, [venueId]);

  if (isLoading || !data) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center text-custom-coral font-bold">
        Error
      </div>
    );
  }

  console.log(data);

  return (
    <>
      <BreadCrumb venueId={venueId} venueName={data.name} />
      <Carousel media={data.media} />
      <section>
        <h1>{data.name}</h1>
      </section>
    </>
  );
}
