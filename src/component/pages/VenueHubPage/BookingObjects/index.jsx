/* eslint-disable react/prop-types */

import BookingCard from "../../../../pages/VenueHubPage/BookingCard";

export default function BookingObjects({ sortedVenueBookings }) {
  console.log(sortedVenueBookings);
  return (
    <ul className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
      {sortedVenueBookings.map((venueBooking, index) => (
        <li key={index}>
          <BookingCard
            venueBooking={venueBooking}
            index={index}
            maxNum={sortedVenueBookings.length}
          />
        </li>
      ))}
    </ul>
  );
}
