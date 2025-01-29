/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl, venuesPath } from "../../js/data/constants";
import Loader from "../../component/Loader";
import Carousel from "../../component/Carousel";
import BreadCrumb from "../../component/Breadcrumb";
import Map from "../../component/Map";
import Calendar from "../../component/Calendar";
import CardLocation from "../../component/CardLocation";
import Heading from "../../component/Heading";

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
    <div className="flex flex-col gap-10 md:gap-15 lg:gap-20">
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
          <BtnCheckAvailability data={data} />
        </div>
        <p className="mx-5 md:mx-7.5 lg:mx-10 md:text-lg lg:text-xl">
          {data.description}
        </p>
      </section>
      <div className="flex flex-col md:flex-row gap-5 md:gap-7.5 lg:gap-10 mx-5 md:mx-7.5 lg:mx-10">
        <Map data={data} />
        <Address data={data} />
      </div>
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <Heading level="2" className={"text-center text-deep-blue"}>
          plan your visit
        </Heading>
        <Calendar data={data.bookings} />
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

function Includes({ data }) {
  const included = {
    rating: `Rating of ${data.rating}`,
    sleeps: `Sleeps up to ${data.maxGuests}`,
    wifi: data.meta.wifi ? "WiFi is available" : null,
    breakfast: data.meta.breakfast ? "Breakfast is included" : null,
    pets: data.meta.pets ? "Pets are welcome" : null,
    parking: data.meta.parking ? "Parking is available" : null,
  };

  return (
    <div className="grow">
      <div className="bg-light-sky-blue rounded-xl pt-2.5 px-2.5 pb-5 md:pt-5 md:px-5 md:pb-10 lg:pt-7.5 lg:px-7.5 lg:pb-15 flex flex-col md:flex-row md:flex-wrap gap-2.5 md:gap-5 lg:gap-7.5 shadow-md shadow-natural-charcoal/40">
        {Object.entries(included).map(([key, value]) => {
          if (value) {
            return (
              <div
                key={key}
                className="flex gap-2.5 leading-none md:text-lg-leading-none lg:text-xl-leading-none md:w-1/3 grow lg:w-1/4"
              >
                <img
                  src="/logo_warm_200.png"
                  alt="icon"
                  className="h-4 md:h-4.5 lg:h-5"
                />
                <span>{value}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

function BtnCheckAvailability({ data }) {
  return (
    <div>
      <button className="shadow-md shadow-natural-charcoal/40 sm:w-full">
        <div className="font-serif text-center bg-natural-charcoal text-white py-4 md:py-5 font-bold uppercase text-lg-leading-none md:text-xl-leading-none lg:text-2xl-leading-none w-48 md:w-56 lg:w-64 sm:w-full">
          <h2>{data.location.city}</h2>
        </div>
        <div className="text-center text-lg-leading-none md:text-xl-leading-none lg:text-2xl-leading-none font-bold py-2.5 md:py-5">
          <span>{`€${data.price} / Night`}</span>
        </div>
        <div className="font-serif text-center bg-deep-blue text-white text-xl-leading-none md:text-2xl-leading-none lg:text-3xl-leading-none font-bold capitalize py-3.75 md:py-5 lg:py-7.5 hover:bg-deep-blue/90">
          <p className="w-30 md:w-36 lg:w-44 mx-auto">check availability</p>
        </div>
      </button>
    </div>
  );
}

function Address({ data }) {
  return (
    <div className="flex flex-col leading-none md:text-lg-leading-none lg:text-xl-leading-none gap-1 md:gap-2 lg:gap-3 justify-end">
      <span className="w-max">{data.name}</span>
      <span className="w-max">{data.location.address}</span>
      <span className="w-max">
        {data.location.zip} {data.location.city}
      </span>
      <span className="w-max">Fuerteventura, {data.location.country}</span>
    </div>
  );
}
