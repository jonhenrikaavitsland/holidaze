import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl, venuesPath } from "../../js/data/constants";
import Loader from "../../component/Loader";
import BreadCrumb from "../../component/Breadcrumb";
import Heading from "../../component/Heading";

export default function BookingPage() {
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
    getData(`${apiUrl}${venuesPath}/${venueId}?_bookings=true`);
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

  console.log("Data:", data);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <BreadCrumb venueId={data.id} venueName={data.name} />
        <Heading level="1" className={"text-center text-deep-blue"}>
          let&apos;s book that holiday
        </Heading>
      </div>
    </div>
  );
}
