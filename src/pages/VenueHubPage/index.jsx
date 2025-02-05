import { useEffect, useMemo, useState } from "react";
import Heading from "../../component/Heading";
import LinkBtn from "./LinkBtn";
import Buttons from "./Buttons";
import Welcome from "./Welcome";
import ViewVenuesObject from "./ViewVenuesObject";
import useProfileVenues from "../../js/api/useProfileVenues";
import Loader from "../../component/Loader";
import BookingObjects from "./BookingObjects";

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
        {viewBooking && <ViewBookings />}
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

function ViewBookings() {
  const [currentPage, setCurrentPage] = useState(1);
  const [accumulatedVenueBookings, setAccumulatedVenueBookings] = useState([]);

  const { venues, meta, loading, error } = useProfileVenues({
    page: currentPage,
    limit: 100,
  });

  const today = useMemo(() => new Date(), []);

  useEffect(() => {
    if (venues && venues.length > 0) {
      // For each venue, attach the venue info to each of its bookings.
      const newVenueBookings = venues.flatMap((venue) =>
        // Create an object for each booking that includes the venue object.
        venue.bookings.map((booking) => ({ venue, booking })),
      );

      // Filter out the bookings where the booking's dateTo is in the past.
      const upcomingVenueBookings = newVenueBookings.filter(
        ({ booking }) => new Date(booking.dateTo) >= today,
      );

      setAccumulatedVenueBookings((prevVenueBookings) => {
        // Combine previous and new bookings.
        const combined = [...prevVenueBookings, ...upcomingVenueBookings];

        // Deduplicate bookings based on their id.
        const uniqueBookingsMap = new Map();
        combined.forEach((item) => {
          uniqueBookingsMap.set(item.booking.id, item);
        });

        return Array.from(uniqueBookingsMap.values());
      });
    }
  }, [venues, today]);

  // Automatically load the next page if more pages are available.
  useEffect(() => {
    if (meta && meta.pageCount > currentPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [meta, currentPage]);

  // Sort the accumulated venue-booking objects by the booking's dateFrom (earliest first).
  const sortedVenueBookings = accumulatedVenueBookings.sort(
    (a, b) => new Date(a.booking.dateFrom) - new Date(b.booking.dateFrom),
  );

  console.log("Sorted Upcoming Bookings:", sortedVenueBookings);
  console.log("META:", meta);
  console.log(loading, error);

  return (
    <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 mx-5 md:mx-7.5 lg:mx-10 mb-10 md:mb-15 lg:mb-20">
      {venues.length > 0 && (
        <Heading level="2" className="text-center text-custom-coral">
          bookings(
          <span className="text-natural-charcoal">
            {sortedVenueBookings.length}
          </span>
          )
        </Heading>
      )}
      {loading ? (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : error ? (
        <p>Oops... I can&apos;t find your bookings!</p>
      ) : (
        <BookingObjects sortedVenueBookings={sortedVenueBookings} />
      )}
    </section>
  );
}

// function BookingObjects({ sortedVenueBookings }) {
//   console.log(sortedVenueBookings);
//   return (
//     <ul className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
//       {sortedVenueBookings.map((venueBooking, index) => (
//         <li key={index}>
//           <BookingCard
//             venueBooking={venueBooking}
//             index={index}
//             maxNum={sortedVenueBookings.length}
//           />
//         </li>
//       ))}
//     </ul>
//   );
// }

// function BookingCard({ venueBooking, index, maxNum }) {
//   const [openState, setOpenState] = useState(false);
//   const dateFromObj = new Date(venueBooking.booking.dateFrom);
//   const dateToObj = new Date(venueBooking.booking.dateTo);

//   const formattedDateFrom = dateFromObj
//     .toLocaleDateString('en-GB', {
//       year: 'numeric',
//       month: 'numeric',
//       day: 'numeric',
//     })
//     .replace(/\//g, '.');
//   const formattedDateTo = dateToObj
//     .toLocaleDateString('en-GB', {
//       year: 'numeric',
//       month: 'numeric',
//       day: 'numeric',
//     })
//     .replace(/\//g, '.');

//   const dayCount = (dateToObj - dateFromObj) / (1000 * 60 * 60 * 24);

//   return (
//     <div className='flex flex-col gap-1'>
//       <span className='text-xs-leading-none'>
//         {index + 1} / {maxNum}
//       </span>
//       <div
//         className={`relative bg-light-sky-blue pt-2.5 px-2.5 md:pt-5 md:px-5 lg:pt-7.5 lg:px-7.5 rounded-xl shadow-md shadow-natural-charcoal/40 ${openState ? 'pb-15 md:pb-20 lg:pb-24' : 'cursor-pointer pb-10 md:pb-15'}`}
//         onClick={() => setOpenState(!openState)}
//       >
//         {openState ? (
//           <BookingOpen venueBooking={venueBooking} formattedDateFrom={formattedDateFrom} formattedDateTo={formattedDateTo} dayCount={dayCount} />
//         ) : (
//           <BookingClosed venueBooking={venueBooking} formattedDateFrom={formattedDateFrom} formattedDateTo={formattedDateTo} />
//         )}

//         <BtnOpenClose openState={openState} />
//       </div>
//     </div>
//   );
// }

// function BookingOpen({ venueBooking, formattedDateFrom, formattedDateTo, dayCount }) {
//   const dateCreated = new Date(venueBooking.booking.created);

//   const formattedDateCreated = dateCreated
//     .toLocaleDateString('en-GB', {
//       year: 'numeric',
//       month: 'numeric',
//       day: 'numeric',
//     })
//     .replace(/\//g, '.');

//   return (
//     <div className='flex flex-col gap-5 md:gap-7.5 lg:gap-10'>
//       <section className='flex flex-col gap-2.5 md:gap-5 lg:gap-7.5'>
//         <Heading level='3' className='text-deep-blue'>
//           booking details
//         </Heading>
//         <div className='flex flex-col gap-1 md:gap-1.5 lg:gap-2 leading-none'>
//           <span className='capitalized italic text-sm-leading-none md:text-base md:leading-none lg:text-lg-leading-none'>
//             created <time dateTime={venueBooking.booking.created}>{formattedDateCreated}</time>
//           </span>
//           <p className='font-medium text-lg-leading-none md:text-xl-leading-none lg:text-2xl-leading-none'>{venueBooking.venue.name}</p>
//           <span className='md:text-lg-leading-none lg:text-xl-leading-none'>
//             <time dateTime={venueBooking.booking.dateFrom}>{formattedDateFrom}</time> - <time dateTime={venueBooking.booking.dateTo}>{formattedDateTo}</time>
//           </span>
//           <p className='capitalize md:text-lg-leading-none lg:text-xl-leading-none'>
//             <span>{venueBooking.venue.location.city}</span>, fuerteventura
//           </p>
//           <p className='md:text-lg-leading-none lg:text-xl-leading-none'>{venueBooking.venue.location.country}</p>
//         </div>
//         <div className='flex flex-col gap-1 md:gap-1.5 lg:gap-2 mt-2.5 md:mt-0'>
//           <div className='flex gap-2.5 md:gap-5 lg:gap-7.5 text-lg-leading-none font-medium md:text-xl-leading-none lg:text-2xl-leading-none'>
//             <p>Booking value:</p>
//             <div className='bg-white px-1 grow'>
//               <span>€{dayCount * venueBooking.venue.price}</span>
//             </div>
//           </div>
//           <div className='flex gap-2.5 md:gap-5 lg:gap-7.5 leading-none md:text-lg-leading-none lg:text-xl-leading-none'>
//             <p>Price per night:</p>
//             <div className='bg-white px-1 grow'>
//               <span>€{venueBooking.venue.price}</span>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className='flex flex-col gap-2.5 md:gap-5 lg:gap-7.5'>
//         <Heading level='3' className='text-deep-blue'>
//           guest details
//         </Heading>
//         <div className='flex flex-col gap-1 md:gap-1.5 lg:gap-2 leading-none md:text-lg-leading-none lg:text-xl-leading-none'>
//           <div className='flex gap-2.5 md:gap-5 lg:gap-7.5'>
//             <p>Number of guests:</p>
//             <div className='bg-white px-1 grow'>
//               <span>{venueBooking.booking.guests}</span>
//             </div>
//           </div>
//           <div className='flex gap-2.5 md:gap-5 lg:gap-7.5'>
//             <p>Number of guests:</p>
//             <div className='bg-white px-1 grow'>
//               <span className='capitalize'>{venueBooking.booking.customer.name}</span>
//             </div>
//           </div>
//           <div className='flex gap-2.5 md:gap-5 lg:gap-7.5'>
//             <p className='whitespace-nowrap'>Contact email:</p>
//             <div className='bg-white px-1 grow min-w-0'>
//               <span className='break-words'>{venueBooking.booking.customer.email}</span>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// function BookingClosed({ venueBooking, formattedDateFrom, formattedDateTo }) {
//   return (
//     <section className="text-center flex flex-col md:flex-row gap-2.5 md:gap-5 lg:gap-10">
//       <Heading level="3" className="text-deep-blue">
//         {venueBooking.venue.name}
//       </Heading>
//       <span className="text-lg-leading-none md:text-xl-leading-none lg:text-2xl-leading-none">
//         <time dateTime={venueBooking.booking.dateFrom}>
//           {formattedDateFrom}
//         </time>{" "}
//         - <time dateTime={venueBooking.booking.dateTo}>{formattedDateTo}</time>
//       </span>
//     </section>
//   );
// }
