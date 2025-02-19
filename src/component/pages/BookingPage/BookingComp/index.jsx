import { useState } from "react";
import WhiteBox from "../WhiteBox";
import useAuthStore from "../../../../js/store/useAuthStore";
import { apiKey, apiUrl, bookingPath } from "../../../../js/data/constants";
import Heading from "../../../Heading";

/* eslint-disable react/prop-types */

/**
 * Renders the booking component UI for a venue, allowing users to book a stay.
 *
 * This component displays detailed booking information including:
 * - Venue image, name, and location.
 * - Booking details such as arrival and departure dates.
 * - Reservation status (available/reserved) and a dropdown to select the number of guests (if not reserved).
 *
 * When the form is submitted, it sends a POST request to create a booking for the specified venue.
 * If the booking is successful, it updates the reservation state by calling the provided `setIsReserved` callback.
 *
 * @component
 * @param {object} props - The component props.
 * @param {object} props.data - The venue data object.
 * @param {string} props.data.id - The unique identifier of the venue.
 * @param {Array<Object>} props.data.media - An array of media objects; the first element is used for the venue image.
 * @param {object} props.data.location - The location details of the venue.
 * @param {string} props.data.location.city - The city where the venue is located.
 * @param {string} props.data.name - The name of the venue.
 * @param {string} fromDate - The formatted check-in date.
 * @param {string} toDate - The formatted check-out date.
 * @param {boolean} isReserved - Indicates whether the venue is already reserved.
 * @param {Function} setIsReserved - Callback function to update the reservation status.
 *
 * @example
 * // Example usage:
 * <BookingComp
 *   data={venueData}
 *   fromDate="01.01.2025"
 *   toDate="05.01.2025"
 *   isReserved={false}
 *   setIsReserved={setReservationState}
 * />
 *
 * @returns {JSX.Element} The rendered booking component UI.
 */
export default function BookingComp({
  data,
  fromDate,
  toDate,
  isReserved,
  setIsReserved,
}) {
  const [numGuests, setNumGuests] = useState(1);
  const { token } = useAuthStore();

  async function handleBooking(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}${bookingPath}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dateFrom: fromDate,
          dateTo: toDate,
          guests: numGuests,
          venueId: data.id,
        }),
      });

      if (response.ok) {
        setIsReserved(true);
      } else {
        console.error("Booking Failed");
      }
    } catch (error) {
      console.error("Error during booking:", error);
    }
  }

  return (
    <div className="flex flex-col md:flex-row rounded-xl bg-light-sky-blue shadow-md shadow-natural-charcoal/40 mx-5 pb-10 md:w-200 md:mx-auto lg:w-250">
      <div className="flex sm:flex-col md:w-1/2 md:flex-col">
        <div className="max-w-1/2 sm:max-w-full md:max-w-full overflow-hidden">
          <img
            src={data.media[0].url}
            alt={data.media[0].alt}
            className="rounded-tl-xl sm:rounded-t-xl object-fill max-h-96 w-full"
            loading="lazy"
          />
        </div>
        <section className="px-5 flex flex-col items-center justify-center gap-2 lg:gap-3.75 py-5 md:py-7.5 w-full">
          <h2 className="uppercase text-deep-blue font-serif font-bold text-xl-leading-none text-center">
            {data.name}
          </h2>
          <span className="font-serif uppercase text-lg-leading-none font-bold">
            {data.location.city}
          </span>
        </section>
      </div>
      <section className="flex flex-col justify-center gap-2.5 lg:gap-7.5 pt-5 px-2.5 md:w-1/2 lg:px-5 lg:pt-7.5">
        <Heading level="3" className="md:text-center">
          Booking Details:
        </Heading>
        <form className="flex flex-col gap-10" onSubmit={handleBooking}>
          <fieldset className="flex flex-col gap-5 lg:gap-7.5">
            <legend className="sr-only">Booking details</legend>
            <WhiteBox
              content={
                <span className="font-bold leading-none">{`${fromDate} - ${toDate}`}</span>
              }
              label="Arrival - departure:"
            />
            <WhiteBox
              content={
                <span
                  className={`font-bold leading-none ${isReserved ? "text-golden-yellow" : "text-accent-teal"} uppercase`}
                >
                  {isReserved ? "reserved" : "available"}
                </span>
              }
              label="status:"
            />
            {!isReserved && (
              <WhiteBox
                content={
                  <>
                    <label className="sr-only" htmlFor="numGuests">
                      how many guests
                    </label>
                    <select
                      className="grow rounded-xl text-center bg-white px-4 pt-1 pb-2.5"
                      id="numGuests"
                      value={numGuests}
                      onChange={(e) => setNumGuests(Number(e.target.value))}
                    >
                      {[...Array(data.maxGuests)].map((_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </>
                }
                label="how many guests:"
                isSelect={true}
              />
            )}
          </fieldset>
          {!isReserved && (
            <div className="mx-auto">
              <button
                type="submit"
                className="bg-deep-blue text-white font-serif font-black text-3xl-leading-none lg:text-4xl-leading-none capitalize px-7.5 py-3.75 lg:px-15 lg:py-7.5 rounded-xl shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/90"
              >
                Book now
              </button>
            </div>
          )}
        </form>
      </section>
    </div>
  );
}
