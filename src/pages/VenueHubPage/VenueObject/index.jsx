/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import BtnOpenClose from "../../../component/BtnOpenClose";
import { useState } from "react";
import Heading from "../../../component/Heading";
import useCreateVenueStore from "../../../js/store/useCreateVenueStore";

export default function VenueObject({
  venue,
  handleViewChange,
  setCurrentVenue,
}) {
  const [openState, setOpenState] = useState(false);
  const createdDate = new Date(venue.created);
  const { clearAll } = useCreateVenueStore();

  const navigate = useNavigate();

  function handleClick() {
    if (venue.id) {
      navigate(`/venue/${venue.id}`);
    } else {
      console.warn("No venue selected!");
    }
  }

  const formattedCreatedDate = createdDate
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .replace(/\//g, ".");

  return (
    <section
      className={`relative flex flex-col gap-5 md:gap-7.5 lg:gap-10 pt-2.5 md:pt-5 lg:pt-7.5 ${openState ? "pb-15 md:pb-20 lg:pb-24" : "pb-5 cursor-pointer"} px-2.5 md:px-5 lg:px-7.5 bg-light-sky-blue rounded-xl shadow-md shadow-natural-charcoal/40`}
      onClick={() => setOpenState(!openState)}
    >
      <Heading level="3" className="text-center text-deep-blue">
        {venue.name}
      </Heading>
      <div
        className={`${!openState && "collapse"} flex flex-col lg:flex-row gap-5 md:gap-7.5 lg:gap-10`}
      >
        <div className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 lg:w-1/2">
          <div className="flex flex-col gap-2 italic leading-none md:text-lg-leading-none lg:text-xl-leading-none">
            <span className="not-italic capitalize font-medium">address:</span>
            <p>{venue.location.address}</p>
            <p>
              {venue.location.zip} {venue.location.city}
            </p>
            <p>Fuerteventura, {venue.location.country}</p>
          </div>
          <div className="flex flex-col gap-2 capitalize leading-none md:text-lg-leading-none lg:text-xl-leading-none">
            <div className="flex gap-2.5">
              <span className="font-medium">rating:</span>
              <div className="bg-white flex gap-2 px-1">
                {[...Array(venue.rating)].map((_, index) => (
                  <div key={index}>
                    <img
                      src="/logo_warm_200.png"
                      alt="rating icon"
                      className="h-4 md:h-4.5 lg:h-5"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2.5">
              <span className="font-medium">sleeps:</span>
              <span>{venue.maxGuests}</span>
            </div>
            <div className="flex gap-2.5">
              <span className="font-medium">wiFi:</span>
              <span>{venue.meta.wifi ? "available" : "not available"}</span>
            </div>
            <div className="flex gap-2.5">
              <span className="font-medium">parking:</span>
              <span>{venue.meta.parking ? "available" : "not available"}</span>
            </div>
            <div className="flex gap-2.5">
              <span className="font-medium">breakfast:</span>
              <span>{venue.breakfast ? "included" : "not included"}</span>
            </div>
            <div className="flex gap-2.5">
              <span className="font-medium">pets:</span>
              <span>{venue.pets ? "allowed" : "not allowed"}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 capitalize leading-none md:text-lg-leading-none lg:text-xl-leading-none">
            <div className="flex gap-2.5">
              <span className="font-medium">rate €:</span>
              <div className="bg-white grow px-1">
                <span>{venue.price}</span>
              </div>
            </div>
            <div className="flex gap-2.5">
              <span className="font-medium">description:</span>
              <div className="bg-white px-1 overflow-hidden">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap lg:max-w-md">
                  {venue.description}
                </p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <span className="font-medium">venue created:</span>
              <div className="bg-white px-1 grow">
                <time dateTime={venue.created}>{formattedCreatedDate}</time>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 md:gap-15 lg:gap-20 grow">
          <div className="flex flex-col gap-2 leading-none md:text-lg-leading-none lg:text-xl-leading-none">
            <span className="font-medium capitalize">images:</span>
            {venue.media.map((obj, index) => (
              <div key={index} className="bg-white px-1 grow overflow-hidden">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap max-w-72">
                  {obj.url}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 w-max mx-auto">
            <div>
              <button
                className="bg-deep-blue text-white font-serif font-bold py-3.75 px-7.5 md:py-5 md:px-10 lg:py-7.5 lg:px-10 rounded-xl capitalize text-2xl-leading-none md:text-3xl-leading-none lg:text-4xl-leading-none shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/90"
                onClick={() => {
                  clearAll();
                  setCurrentVenue(venue);
                  handleViewChange("updateVenue");
                }}
              >
                update venue
              </button>
            </div>
            <div>
              <button
                className="bg-deep-blue text-white font-serif font-bold py-3.75 px-7.5 md:py-5 md:px-10 lg:py-7.5 lg:px-10 rounded-xl capitalize text-2xl-leading-none md:text-3xl-leading-none lg:text-4xl-leading-none shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/90 w-full"
                onClick={() => {
                  handleClick();
                }}
              >
                view venue
              </button>
            </div>
          </div>
        </div>
      </div>
      <BtnOpenClose openState={openState} />
    </section>
  );
}
