import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl, venuesPath } from "../../../js/data/constants";
import Loader from "../../Loader";
import Carousel from "../../Carousel";
import BreadCrumb from "../../Breadcrumb";
import Map from "../../Map";
import Calendar from "../../Calendar";
import CardLocation from "../../CardLocation";
import Heading from "../../Heading";
import Address from "./Address";
import BtnCheckAvailability from "./BtnCheckAvailability";
import Includes from "./Includes";

export default function VenuePage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { venueId } = useParams();
  const calendarRef = useRef(null);

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

  console.log(data);

  return (
    <div className="flex flex-col gap-10 md:gap-15 lg:gap-20 mb-10 md:mb-15 lg:mb-20">
      <div className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <BreadCrumb venueId={venueId} venueName={data.name} />
        <Carousel media={data.media} />
      </div>
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <Heading level="1" className={"text-center text-deep-blue"}>
          {data.name}
        </Heading>
        <div className="flex sm:flex-col gap-5 md:gap-7.5 lg:gap-10 ms-5 sm:mx-5 md:mx-7.5 lg:mx-10">
          <Includes data={data} />
          <BtnCheckAvailability
            data={data}
            scrollToCalendar={() =>
              calendarRef.current.scrollIntoView({ behavior: "smooth" })
            }
          />
        </div>
        <p className="mx-5 md:mx-7.5 lg:mx-10 md:text-lg lg:text-xl">
          {data.description}
        </p>
      </section>
      <div className="flex flex-col md:flex-row gap-5 md:gap-7.5 lg:gap-10 mx-5 md:mx-7.5 lg:mx-10">
        <Map data={data} />
        <Address data={data} />
      </div>
      <section
        className="flex flex-col gap-5 md:gap-7.5 lg:gap-10"
        ref={calendarRef}
      >
        <Heading level="2" className={"text-center text-deep-blue"}>
          plan your visit
        </Heading>
        <Calendar data={data.bookings} venueId={venueId} />
      </section>
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <Heading level="2" className={"text-center text-deep-blue"}>
          Explore {data.location.city}
        </Heading>
        <CardLocation location={{ name: data.location.city }} />
      </section>
    </div>
  );
}
