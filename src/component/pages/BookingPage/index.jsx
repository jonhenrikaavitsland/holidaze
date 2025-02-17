import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { apiUrl, venuesPath } from "../../../js/data/constants";
import Loader from "../../Loader";
import BreadCrumb from "../../Breadcrumb";
import Heading from "../../Heading";
import CardVenue from "../../CardVenue";
import CardLocation from "../../CardLocation";
import BookingComp from "./BookingComp";

export default function BookingPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { venueId } = useParams();
  let [searchParams] = useSearchParams();
  const [isReserved, setIsReserved] = useState(false);

  const fromDate = searchParams.get("from");
  const toDate = searchParams.get("to");

  useEffect(() => {
    document.title = "Booking || Holidaze";

    const metaDescription = document.querySelector('meta[name="description"]');
    const content =
      "Book your holiday with Holidaze now. It is fast, easy and reliable!";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

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

  return (
    <div className="flex flex-col gap-10 md:gap-15 lg:gap-20 mb-10 md:mb-15 lg:mb-20">
      <div className="flex flex-col gap-5">
        <BreadCrumb venueId={data.id} venueName={data.name} />
        <Heading level="1" className={"text-center text-deep-blue"}>
          let&apos;s book that holiday
        </Heading>
      </div>
      <BookingComp
        data={data}
        fromDate={fromDate}
        toDate={toDate}
        isReserved={isReserved}
        setIsReserved={setIsReserved}
      />
      {isReserved && (
        <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
          <Heading level="2" className={"text-center text-deep-blue"}>
            Explore your destination
          </Heading>
          <CardVenue venue={data} />
          <CardLocation location={{ name: data.location.city }} />
        </section>
      )}
    </div>
  );
}
