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
      <BookingComp data={data} fromDate={fromDate} toDate={toDate} />
    </div>
  );
}

function BookingComp({ data, fromDate, toDate }) {
  return (
    <div className="flex flex-col rounded-xl bg-light-sky-blue shadow-md shadow-natural-charcoal/40 mx-5 md:mx-7.5 lg:mx-10 pb-10">
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
        <form className="flex flex-col gap-10">
          <fieldset className="flex flex-col gap-5">
            <legend className="sr-only">Booking details</legend>
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
            <WhiteBox
              content={
                <>
                  <label className="sr-only" htmlFor="numGuests">
                    how many guests
                  </label>
                  <select
                    className="grow rounded-xl text-center bg-white px-4 pt-1 pb-2.5"
                    id="numGuests"
                  >
                    {[...Array(data.maxGuests)].map((_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </>
              }
              label="how many guests:"
              isSelect={true}
            />
          </fieldset>
          <div className="mx-auto">
            <button
              type="submit"
              className="bg-deep-blue text-white font-serif font-black text-3xl-leading-none capitalize px-7.5 py-3.75 rounded-xl shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/90"
            >
              Book now
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function WhiteBox(props) {
  return (
    <div
      className={`bg-white w-full border border-natural-charcoal/40 pt-1 px-1 ${!props.isSelect ? "pb-2.5 gap-1" : ""} flex flex-col`}
    >
      <p className="uppercase text-xs-leading-none font-bold">{props.label}</p>
      <div className="w-full flex justify-center">{props.content}</div>
    </div>
  );
}
