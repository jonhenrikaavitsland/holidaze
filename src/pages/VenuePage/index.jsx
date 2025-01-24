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
    <div className="flex flex-col gap-10 md:gap-15">
      <div className="flex flex-col gap-5 md:gap-7.5">
        <BreadCrumb venueId={venueId} venueName={data.name} />
        <Carousel media={data.media} />
      </div>
      <section className="flex flex-col gap-5 md:gap-7.5">
        <h1 className="text-center font-serif font-bold text-xl-leading-none md:text-2xl-leading-none text-deep-blue">
          {data.name}
        </h1>
        <div className="flex sm:flex-col gap-5 md:gap-7.5 ms-5 sm:mx-5 md:mx-7.5">
          <Includes data={data} />
          <BtnCheckAvailability data={data} />
        </div>
        <p className="mx-5 md:mx-7.5 text-lg">{data.description}</p>
      </section>
      <div className="flex flex-col md:flex-row gap-5 md:gap-7.5 mx-5 md:mx-7.5">
        <Map data={data} />
        <Address data={data} />
      </div>
      <section className="flex flex-col gap-5">
        <h2 className="font-serif text-center font-bold text-lg-leading-none text-deep-blue capitalize">
          plan your visit
        </h2>
        <Calendar />
      </section>
      <section className="flex flex-col gap-5">
        <h2 className="font-serif text-center font-bold text-lg-leading-none text-deep-blue capitalize">
          Explore {data.location.city}
        </h2>
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
    <div className="bg-light-sky-blue rounded-xl pt-2.5 px-2.5 pb-5 md:pt-5 md:px-5 md:pb-10 flex flex-col md:flex-row md:flex-wrap gap-2.5 md:gap-5 shadow-md shadow-natural-charcoal/40 grow">
      {Object.entries(included).map(([key, value]) => {
        if (value) {
          return (
            <div
              key={key}
              className="flex gap-2.5 leading-none md:text-xl-leading-none md:w-1/3 grow"
            >
              <img src="/logo_warm_200.png" alt="icon" className="h-4 md:h-5" />
              <span>{value}</span>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

function BtnCheckAvailability({ data }) {
  return (
    <div>
      <button className="shadow-md shadow-natural-charcoal/40 sm:w-full">
        <div className="font-serif text-center bg-natural-charcoal text-white py-4 md:py-5 font-bold uppercase text-lg-leading-none md:text-xl-leading-none w-48 md:w-56 sm:w-full">
          <h2>{data.location.city}</h2>
        </div>
        <div className="text-center text-lg-leading-none md:text-xl-leading-none font-bold py-2.5 md:py-5">
          <span>{`€${data.price} / Night`}</span>
        </div>
        <div className="font-serif text-center bg-deep-blue text-white text-xl-leading-none md:text-2xl-leading-none font-bold capitalize py-3.75 md:py-5 hover:bg-deep-blue/90">
          <p className="w-30 md:w-36 mx-auto">check availability</p>
        </div>
      </button>
    </div>
  );
}

function Address({ data }) {
  return (
    <div className="flex flex-col leading-none md:text-lg-leading-none gap-1 md:gap-2 justify-end">
      <span className="w-max">{data.name}</span>
      <span className="w-max">{data.location.address}</span>
      <span className="w-max">
        {data.location.zip} {data.location.city}
      </span>
      <span className="w-max">Fuerteventura, {data.location.country}</span>
    </div>
  );
}
