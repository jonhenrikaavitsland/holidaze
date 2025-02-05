import { useState } from "react";
import Heading from "../../component/Heading";
import useProfileVenues from "../../js/api/useProfileVenues";
import Loader from "../../component/Loader";
import BtnOpenClose from "../../component/BtnOpenClose";
import { useNavigate } from "react-router-dom";
import LinkBtn from "./LinkBtn";
import Buttons from "./Buttons";
import Paragraph from "./Paragraph";

/* eslint-disable react/prop-types */
export default function VenueHubPage() {
  const [viewWelcome, setViewWelcome] = useState(true);
  const [viewBooking, setViewBooking] = useState(false);
  const [viewVenues, setViewVenues] = useState(false);
  const [viewNewVenue, setViewNewVenue] = useState(false);
  const [viewUpdateVenue, setUpdateVenue] = useState(false);
  const [currentVenue, setCurrentVenue] = useState("");

  function handleViewChange(view) {
    setViewWelcome(view === "welcome");
    setViewBooking(view === "booking");
    setViewVenues(view === "venues");
    setViewNewVenue(view === "newVenue");
    setUpdateVenue(view === "updateVenue");
  }

  console.log(viewBooking, viewNewVenue, viewUpdateVenue, currentVenue);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="hidden lg:block bg-warm-beige p-10 w-56 border-r border-natural-charcoal/40 min-h-full">
        <div className="mt-17.5">
          <ul className="flex flex-col gap-10 w-max">
            <LinkBtn
              content="view bookings"
              handleViewChange={handleViewChange}
              kind="booking"
              status={viewBooking}
            />
            <LinkBtn
              content="view venues"
              handleViewChange={handleViewChange}
              kind="venues"
              status={viewVenues}
            />
            <LinkBtn
              content="new venue"
              handleViewChange={handleViewChange}
              kind="newVenue"
              status={viewNewVenue}
            />
          </ul>
        </div>
      </div>
      <section className="lg:grow pt-5 md:pt-7.5 lg:pt-10">
        <Heading level="1" className="text-center text-deep-blue">
          venue hUB
        </Heading>
        <Buttons
          handleViewChange={handleViewChange}
          bookingStatus={viewBooking}
          venuesStatus={viewVenues}
          newVenueStatus={viewNewVenue}
        />
        {viewWelcome && <Welcome handleViewChange={handleViewChange} />}
        {/* {viewBooking && <ViewBookings />} */}
        {viewVenues && (
          <ViewVenuesObject
            handleViewChange={handleViewChange}
            setCurrentVenue={setCurrentVenue}
          />
        )}
      </section>
    </div>
  );
}

function ViewVenuesObject({ handleViewChange, setCurrentVenue }) {
  const [currentPage, setCurrentPage] = useState(1);

  const { venues, meta, loading, error } = useProfileVenues({
    page: currentPage,
    limit: 10,
  });

  console.log("VENUES:", venues);

  return (
    <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 mx-5 md:mx-7.5 lg:mx-10 mb-10 md:mb-15 lg:mb-20">
      {venues.length > 0 && (
        <Heading level="2" className="text-center text-custom-coral">
          venues
        </Heading>
      )}
      {loading ? (
        <div className="flex justify-center pt-10">
          <Loader />
        </div>
      ) : venues.length > 0 ? (
        <HasVenues
          venues={venues}
          meta={meta}
          error={error}
          setCurrentPage={setCurrentPage}
          handleViewChange={handleViewChange}
          setCurrentVenue={setCurrentVenue}
        />
      ) : (
        <HasNoVenues handleViewChange={handleViewChange} />
      )}
    </section>
  );
}

function HasVenues({
  venues,
  meta,
  error,
  setCurrentPage,
  handleViewChange,
  setCurrentVenue,
}) {
  console.log(meta, error, setCurrentPage);
  return (
    <div className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
      {venues.map((venue, index) => (
        <div key={index}>
          <VenueObject
            venue={venue}
            handleViewChange={handleViewChange}
            setCurrentVenue={setCurrentVenue}
          />
        </div>
      ))}
    </div>
  );
}

function VenueObject({ venue, handleViewChange, setCurrentVenue }) {
  const [openState, setOpenState] = useState(false);
  const createdDate = new Date(venue.created);

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
                  setCurrentVenue(venue.id);
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

function HasNoVenues({ handleViewChange }) {
  return (
    <div className="flex flex-col gap-10 md:gap-15 lg:gap-10">
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <Heading level="2" className="text-center">
          no venues yet? let&apos;s get started!
        </Heading>
        <p className="md:text-lg lg:text-xl">
          Hi there, it looks like you haven&apos;t listed any venues on Holidaze
          just yet. Don&apos;t miss out on the opportunity to turn your property
          into a destination for eager holidaymakers! Listing your venue is
          quick, easy, and comes with plenty of benefits:
        </p>
      </section>
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <Heading level="3">why list your venue on holidaze?</Heading>
        <Paragraph
          spanContent="reach more guests: "
          content="Tap into a growing community of travelers searching for their next getaway."
        />
        <Paragraph
          spanContent="maximize earnings: "
          content="Turn your property into a source of income, whether it’s a spare room, a cozy cabin, or a luxurious estate."
        />
        <Paragraph
          spanContent="easy management: "
          content="With our Venue HUB, managing your bookings, availability, and guest communication has never been simpler."
        />
        <Paragraph
          spanContent="showcase your space: "
          content="Our platform lets you highlight your venue’s unique features with photos, descriptions, and amenities that stand out."
        />
      </section>
      <p className="text-center font-serif text-xl md:text-2xl lg:text-3xl font-bold">
        Take the first step today—your future guests are waiting to discover
        your property.
      </p>
      <CreateNewBtn handleViewChange={handleViewChange} />
    </div>
  );
}

// function ViewBookings() {
//   const [currentPage, setCurrentPage] = useState(1);

//   const { venues, meta, loading, error } = useProfileVenues({ page: currentPage, limit: 100 });

//   console.log('VENUES:', venues);

//   return (
//     <section>
//       <Heading level='2' className='text-center text-custom-coral'>
//         active bookings
//       </Heading>
//     </section>
//   );
// }

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
          venues and bookings. Whether you&apos;re managing a single cozy
          bungalow or a portfolio of stunning properties, Venue HUB provides you
          with the tools you need to succeed.
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

// function Paragraph({ spanContent, content }) {
//   return (
//     <p className="md:text-lg lg:text-xl">
//       <span className="capitalize font-bold">{spanContent}</span>
//       {content}
//     </p>
//   );
// }

// function Buttons({
//   handleViewChange,
//   bookingStatus,
//   venuesStatus,
//   newVenueStatus,
// }) {
//   return (
//     <div className="flex w-full mt-5 mb-10 md:mt-7.5 md:mb-15">
//       <ul className="lg:hidden mx-auto text-center bg-warm-beige sm:w-48 w-64 shadow-md shadow-natural-charcoal/40">
//         <LinkBtn
//           content="view bookings"
//           className=" hover:font-medium w-full"
//           handleViewChange={handleViewChange}
//           kind="booking"
//           status={bookingStatus}
//         />
//         <LinkBtn
//           content="view venues"
//           className="border-t border-b border-natural-charcoal/40 w-full hover:font-medium"
//           handleViewChange={handleViewChange}
//           kind="venues"
//           status={venuesStatus}
//         />
//         <LinkBtn
//           content="new venue"
//           className="w-full hover:font-medium"
//           handleViewChange={handleViewChange}
//           kind="newVenue"
//           status={newVenueStatus}
//         />
//       </ul>
//     </div>
//   );
// }

// function LinkBtn({ className, content, handleViewChange, kind, status }) {
//   return (
//     <li>
//       <button
//         className={`font-serif text-xl-leading-none py-2.5 capitalize ${className} ${status && "font-bold"}`}
//         onClick={() => handleViewChange(`${kind}`)}
//       >
//         {content}
//       </button>
//     </li>
//   );
// }
