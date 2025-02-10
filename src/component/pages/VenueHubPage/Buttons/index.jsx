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
      <ul className="lg:hidden mx-auto text-center bg-warm-beige sm:w-48 w-64 shadow-md shadow-natural-charcoal/40">
        <LinkBtn
          content="view bookings"
          className=" hover:font-bold w-full"
          handleViewChange={handleViewChange}
          kind="booking"
          status={bookingStatus}
        />
        <LinkBtn
          content="view venues"
          className="border-t border-b border-natural-charcoal/40 w-full hover:font-bold"
          handleViewChange={handleViewChange}
          kind="venues"
          status={venuesStatus}
        />
        <LinkBtn
          content="new venue"
          className="w-full hover:font-bold"
          handleViewChange={handleViewChange}
          kind="newVenue"
          status={newVenueStatus}
          action={clearAll}
        />
      </ul>
    </div>
  );
}
