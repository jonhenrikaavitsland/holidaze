/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { apiUrl, venuesPath } from "../../js/data/constants";
import Loader from "../../component/Loader";
import BreadCrumb from "../../component/Breadcrumb";
import Heading from "../../component/Heading";

export default function BookingPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let { venueId } = useParams();
  let [searchParams] = useSearchParams();

  const fromDate = searchParams.get("from");
  const toDate = searchParams.get("to");

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
      <div className="rounded-xl bg-light-sky-blue shadow-md shadow-natural-charcoal/40 mx-5 md:mx-7.5 lg:mx-10">
        <div className="flex sm:flex-col">
          <div className="max-w-1/2 sm:max-w-full">
            <img
              src={data.media[0].url}
              alt={data.media[0].alt}
              className="rounded-tl-xl sm:rounded-t-xl h-full object-cover"
            />
          </div>
          <section className="px-5 flex flex-col items-center gap-2 py-5 w-full">
            <h2 className="w-max uppercase text-deep-blue font-serif font-bold text-xl-leading-none">
              {data.name}
            </h2>
            <span className="font-serif uppercase text-lg-leading-none font-bold">
              {data.location.city}
            </span>
          </section>
        </div>
        <section className="flex flex-col gap-2.5 pt-5 px-2.5">
          <h3 className="font-serif font-bold">Booking Details:</h3>
          <div className="flex flex-col gap-5">
            <WhiteBox
              content={
                <span className="font-bold leading-none">{`${fromDate} - ${toDate}`}</span>
              }
              label="Arrival - departure:"
            />
            <WhiteBox
              content={
                <span className="font-bold leading-none text-accent-teal uppercase">
                  available
                </span>
              }
              label="status:"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function WhiteBox(props) {
  return (
    <div className="bg-white w-full border border-natural-charcoal/40 pt-1 px-1 pb-2.5 flex flex-col gap-1">
      <p className="uppercase text-xs-leading-none font-bold">{props.label}</p>
      <div className="w-full flex justify-center">{props.content}</div>
    </div>
  );
}
