/* eslint-disable react/prop-types */

import useCreateVenueStore from "../../../../js/store/useCreateVenueStore";
import LinkBtn from "../LinkBtn";

export default function Buttons({
  handleViewChange,
  bookingStatus,
  venuesStatus,
  newVenueStatus,
}) {
  const { clearAll } = useCreateVenueStore();
  return (
    <div className="flex w-full mt-5 mb-10 md:mt-7.5 md:mb-15">
      <ul className="flex flex-col gap-5 md:gap-7.5 lg:hidden mx-auto text-center sm:w-48 w-64 ">
        <LinkBtn
          content="view bookings"
          className="bg-warm-beige border border-natural-charcoal/40 hover:font-bold w-full shadow-md shadow-natural-charcoal/40"
          handleViewChange={handleViewChange}
          kind="booking"
          status={bookingStatus}
        />
        <LinkBtn
          content="view venues"
          className="bg-warm-beige border border-natural-charcoal/40 w-full hover:font-bold shadow-md shadow-natural-charcoal/40"
          handleViewChange={handleViewChange}
          kind="venues"
          status={venuesStatus}
        />
        <LinkBtn
          content="new venue"
          className="bg-warm-beige w-full border border-natural-charcoal/40 hover:font-bold shadow-md shadow-natural-charcoal/40"
          handleViewChange={handleViewChange}
          kind="newVenue"
          status={newVenueStatus}
          action={clearAll}
        />
      </ul>
    </div>
  );
}
