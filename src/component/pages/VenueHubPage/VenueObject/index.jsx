/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BtnOpenClose from "../../../BtnOpenClose";
import Heading from "../../../Heading";
import useCreateVenueStore from "../../../../js/store/useCreateVenueStore";

/**
 * Renders a detailed venue object card that allows users to view and update venue information.
 *
 * This component displays a venue's information in a card format, including:
 * - The venue name as a heading.
 * - The venue's address, rating (displayed as icons), guest capacity, and available amenities (WiFi, parking, breakfast, and pets).
 * - Additional details such as the nightly rate, a truncated description, and the creation date of the venue.
 * - A list of media URLs associated with the venue.
 *
 * The card supports an expandable view:
 * - When in the closed state, only basic information is shown.
 * - When expanded (openState is true), more details (e.g., images list) and action buttons become visible.
 *
 * The component also provides two action buttons:
 * - "update venue": Clears the venue creation state, sets the current venue in the parent state (via `setCurrentVenue`),
 *   and triggers a view change to the update venue form.
 * - "view venue": Navigates to the detailed venue view by calling the `handleClick` function.
 *
 * The state of the card (open or closed) is toggled by clicking anywhere on the card, and the current state is visually indicated
 * by the `BtnOpenClose` component.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.venue - The venue object containing detailed information.
 * @param {string} props.venue.id - The unique identifier of the venue.
 * @param {string} props.venue.name - The name of the venue.
 * @param {object} props.venue.location - The location details of the venue.
 * @param {string} props.venue.location.address - The street address of the venue.
 * @param {string} props.venue.location.zip - The zip code of the venue.
 * @param {string} props.venue.location.city - The city where the venue is located.
 * @param {string} props.venue.location.country - The country where the venue is located.
 * @param {number} props.venue.rating - The numeric rating of the venue.
 * @param {number} props.venue.maxGuests - The maximum number of guests the venue can accommodate.
 * @param {object} props.venue.meta - An object containing boolean flags for amenities:
 *   - {boolean} wifi - Indicates if WiFi is available.
 *   - {boolean} parking - Indicates if parking is available.
 *   - {boolean} breakfast - Indicates if breakfast is included.
 *   - {boolean} pets - Indicates if pets are allowed.
 * @param {number|string} props.venue.price - The nightly price of the venue.
 * @param {string} props.venue.description - A description of the venue.
 * @param {string} props.venue.created - The ISO date string when the venue was created.
 * @param {Array<Object>} props.venue.media - An array of media objects, each with a `url` property.
 * @param {Function} props.handleViewChange - Callback function to change the view (e.g., to "updateVenue" or "viewVenue").
 * @param {Function} props.setCurrentVenue - Callback function to set the currently selected venue for further actions.
 *
 * @example
 * // Example usage:
 * <VenueObject
 *   venue={venueData}
 *   handleViewChange={(view) => console.log("Switching to", view)}
 *   setCurrentVenue={(venue) => console.log("Selected venue:", venue)}
 * />
 *
 * @returns {JSX.Element} The rendered venue object card component.
 */
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
        className={`${!openState && "collapse h-0"} flex flex-col lg:flex-row gap-5 md:gap-7.5 lg:gap-10`}
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
              <span>{venue.meta.breakfast ? "included" : "not included"}</span>
            </div>
            <div className="flex gap-2.5">
              <span className="font-medium">pets:</span>
              <span>{venue.meta.pets ? "allowed" : "not allowed"}</span>
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
