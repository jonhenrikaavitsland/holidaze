import { useState } from "react";
import Heading from "../../component/Heading";

/* eslint-disable react/prop-types */
export default function VenueHubPage() {
  const [viewWelcome, setViewWelcome] = useState(true);
  const [viewBooking, setViewBooking] = useState(false);
  const [viewVenues, setViewVenues] = useState(false);
  const [viewNewVenue, setViewNewVenue] = useState(false);

  function handleViewChange(view) {
    setViewWelcome(view === "welcome");
    setViewBooking(view === "booking");
    setViewVenues(view === "venues");
    setViewNewVenue(view === "newVenue");
  }

  console.log(viewBooking, viewVenues, viewNewVenue);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="hidden lg:block bg-warm-beige p-10 w-56 border-r border-natural-charcoal/40 min-h-full">
        <div className="mt-17.5">
          <ul className="flex flex-col gap-10 w-max">
            <LinkBtn
              content="view bookings"
              handleViewChange={handleViewChange}
              kind="booking"
            />
            <LinkBtn
              content="view venues"
              handleViewChange={handleViewChange}
              kind="venues"
            />
            <LinkBtn
              content="new venue"
              handleViewChange={handleViewChange}
              kind="newVenue"
            />
          </ul>
        </div>
      </div>
      <section className="lg:grow pt-5 md:pt-7.5 lg:pt-10">
        <Heading level="1" className="text-center text-deep-blue">
          venue hUB
        </Heading>
        <Buttons handleViewChange={handleViewChange} />
        {viewWelcome && <Welcome handleViewChange={handleViewChange} />}
      </section>
    </div>
  );
}

function Welcome({ handleViewChange }) {
  return (
    <div className="flex flex-col gap-10 md:gap-15 mx-5 md:mx-7.5 lg:mx-10 mb-5 md:mb-7.5 lg:mb-10">
      <div className="flex flex-col gap-5 md:gap-7.5 md:text-lg lg:text-xl">
        <p>
          Welcome to the <span className="capitalize font-bold">venue HUB</span>{" "}
          — your central dashboard for managing your rental properties with ease
          and efficiency!
        </p>
        <p>
          Here in the Venue HUB, you have complete control over your listed
          venues and bookings. Whether you’re managing a single cozy bungalow or
          a portfolio of stunning properties, Venue HUB provides you with the
          tools you need to succeed.
        </p>
      </div>
      <section className="flex flex-col gap-5 md:gap-7.5">
        <Heading level="2" className="text-center">
          What can you do in the venue HUB?
        </Heading>
        <Paragraph
          spanContent="view venues: "
          content="Keep track of all your listed properties in one convenient location. Update details, check availability, and ensure your venues are always presented at their best."
        />
        <Paragraph
          spanContent="view bookings: "
          content="Stay organized and never miss a booking! View upcoming reservations, manage inquiries, and maintain clear communication with your guests."
        />
        <Paragraph
          spanContent="create new venue: "
          content="Effortlessly add all your venues, wether it be one or many. Add amazing photos, write exciting descriptions and pick your amenities. Holidaze has you covered."
        />
      </section>
      <CreateNewBtn handleViewChange={handleViewChange} />
    </div>
  );
}

function CreateNewBtn({ handleViewChange }) {
  return (
    <div className="mx-auto">
      <button
        className="font-serif font-bold text-2xl-leading-none md:text-3xl-leading-none lg:text-4xl-leading-none text-white bg-deep-blue py-3.75 px-7.5 md:py-5 md:px-10 lg:py-7.5 lg:px-15 rounded-xl shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/90"
        onClick={() => handleViewChange("newVenue")}
      >
        create new venue
      </button>
    </div>
  );
}

function Paragraph({ spanContent, content }) {
  return (
    <p className="md:text-lg lg:text-xl">
      <span className="capitalize font-bold">{spanContent}</span>
      {content}
    </p>
  );
}

function Buttons({ handleViewChange }) {
  return (
    <div className="flex w-full mt-5 mb-10 md:mt-7.5 md:mb-15">
      <ul className="lg:hidden mx-auto text-center bg-warm-beige sm:w-48 w-64">
        <LinkBtn
          content="view bookings"
          className=" hover:font-medium w-full"
          handleViewChange={handleViewChange}
          kind="booking"
        />
        <LinkBtn
          content="view venues"
          className="border-t border-b border-natural-charcoal/40 w-full hover:font-medium"
          handleViewChange={handleViewChange}
          kind="venues"
        />
        <LinkBtn
          content="new venue"
          className="w-full hover:font-medium"
          handleViewChange={handleViewChange}
          kind="newVenue"
        />
      </ul>
    </div>
  );
}

function LinkBtn({ className, content, handleViewChange, kind }) {
  return (
    <li>
      <button
        className={`font-serif text-xl-leading-none py-2.5 capitalize ${className}`}
        onClick={() => handleViewChange(`${kind}`)}
      >
        {content}
      </button>
    </li>
  );
}
