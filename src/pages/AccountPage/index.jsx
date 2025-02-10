/* eslint-disable react/prop-types */
import { useState } from "react";
import Heading from "../../component/Heading";
import Loader from "../../component/Loader";
import useUserBookings from "../../js/api/useUserBookings";
import useAuthStore from "../../js/store/useAuthStore";
import BtnOpenClose from "../../component/BtnOpenClose";
import useUIStore from "../../js/store/useUIStore";

export default function AccountPage() {
  const { user } = useAuthStore();
  const { bookings, loading, error } = useUserBookings();
  console.log("bookings:", bookings);

  return (
    <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 px-5 md:px-7.5 lg:px-10 pt-5 md:pt-7.5 lg:pt-10 mb-10 md:mb-15 lg:mb-20">
      <Heading level="1" className="text-center text-deep-blue">
        Account
      </Heading>
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2">
        <BioCard user={user} />
        <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
          <Heading level="2" className="text-center text-deep-blue">
            Upcoming bookings
          </Heading>
          {loading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}
          {error && (
            <p className="text-center font-bold text-custom-coral">
              {error.message}
            </p>
          )}
          {!loading && !error && bookings.length === 0 && (
            <p className="text-center">
              It looks like you have not placed any bookings yet.
            </p>
          )}
          {!loading && !error && bookings.length > 0 && (
            <ul className="flex flex-col gap-5 md:grid grid-cols-2 md:gap-7.5 lg:flex lg:flex-col lg:gap-10">
              {bookings.map((booking, index) => (
                <li key={booking.id}>
                  <BookingCard
                    booking={booking}
                    index={index}
                    maxNum={bookings.length}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </section>
  );
}

function BookingCard({ booking, index, maxNum }) {
  const dateFromObj = new Date(booking.dateFrom);
  const dateToObj = new Date(booking.dateTo);
  const [isCardOpen, setIsCardOpen] = useState(false);

  const formattedDateFrom = dateFromObj
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .replace(/\//g, ".");
  const formattedDateTo = dateToObj
    .toLocaleDateString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .replace(/\//g, ".");

  const dayCount = (dateToObj - dateFromObj) / (1000 * 60 * 60 * 24);

  return (
    <div>
      <span className="text-xs-leading-none">
        {index + 1} / {maxNum}
      </span>
      <section
        className="relative flex flex-col gap-2.5 bg-light-sky-blue pt-2.5 px-2.5 pb-10 rounded-xl shadow-md shadow-natural-charcoal/40 cursor-pointer"
        onClick={() => setIsCardOpen(!isCardOpen)}
      >
        <VenueName booking={booking} isCardOpen={isCardOpen} />
        {!isCardOpen && (
          <ClosedCard
            booking={booking}
            formattedDateFrom={formattedDateFrom}
            formattedDateTo={formattedDateTo}
          />
        )}
        {isCardOpen && (
          <OpenCard
            booking={booking}
            formattedDateFrom={formattedDateFrom}
            formattedDateTo={formattedDateTo}
            days={dayCount}
          />
        )}
        <BtnOpenClose openState={isCardOpen} />
      </section>
    </div>
  );
}

function VenueName({ booking, isCardOpen }) {
  return (
    <div className="flex gap-2.5 md:gap-3.75 lg:gap-5">
      <Heading level="3" className="text-deep-blue">
        {booking.venue.name}
      </Heading>
      {isCardOpen && (
        <div className="flex gap-2">
          {[...Array(booking.venue.rating)].map((_, index) => (
            <div key={index}>
              <img
                src="/logo_warm_200.png"
                alt="rating icon"
                className="h-4.5 md:h-5 lg:h-6"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OpenCard({ booking, formattedDateFrom, formattedDateTo, days }) {
  const totalValue = booking.venue.price * days;

  return (
    <div className="flex flex-col gap-5">
      <Address booking={booking} />
      <CheckInOutBox
        booking={booking}
        formattedDateFrom={formattedDateFrom}
        formattedDateTo={formattedDateTo}
      />
      <section className="flex flex-col gap-2.5">
        <Heading level="3" className="text-deep-blue">
          Amenities Included:
        </Heading>
        <DisplayMeta meta={booking.venue.meta} />
      </section>
      <div className="flex flex-col gap-2.5 leading-none md:text-lg-leading-none lg:text-xl-leading-none">
        <span>{booking.guests} Guests</span>
        <span>€{booking.venue.price} / night</span>
        <span>€{totalValue} Total</span>
      </div>
    </div>
  );
}

function DisplayMeta({ meta }) {
  return (
    <ul className="flex flex-col gap-1 leading-none md:text-lg-leading-none lg:text-xl-leading-none list-disc ms-5 md:ms-7.5 lg:ms-10">
      {meta.wifi && (
        <li>
          <span>WiFi is included</span>
        </li>
      )}
      {meta.breakfast && (
        <li>
          <span>Breakfast is included</span>
        </li>
      )}
      {meta.parking && (
        <li>
          <span>Parking is available</span>
        </li>
      )}
      {meta.pets && (
        <li>
          <span>Pets are welcome</span>
        </li>
      )}
    </ul>
  );
}

function CheckInOutBox({ booking, formattedDateFrom, formattedDateTo }) {
  return (
    <div className="flex flex-col gap-1.5 md:gap-2 bg-white border border-natural-charcoal/40 p-1 md:p-1.5 leading-none">
      <span className="text-sm-leading-none font-medium md:text-base md:leading-none">
        Check-in / Check-out
      </span>
      <div className="mx-auto text-base md:text-lg">
        <time className="" dateTime={booking.dateFrom}>
          {formattedDateFrom}
        </time>
        <span> - </span>
        <time dateTime={booking.dateTo}>{formattedDateTo}</time>
      </div>
    </div>
  );
}

function Address({ booking }) {
  return (
    <div className="flex flex-col leading-none gap-2.5 md:text-lg-leading-none lg:text-xl-leading-none">
      <span>{booking.venue.location.address}</span>
      <span>
        {booking.venue.location.zip} {booking.venue.location.city}
      </span>
      <span>Fuerteventura, {booking.venue.location.country}</span>
    </div>
  );
}

function ClosedCard({ booking, formattedDateFrom, formattedDateTo }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="leading-none">
        {booking.venue.location.city}, Fuerteventura
      </span>
      <span className="leading-none">{booking.venue.location.country}</span>
      <div className="leading-none">
        <time className="" dateTime={booking.dateFrom}>
          {formattedDateFrom}
        </time>
        <span> - </span>
        <time dateTime={booking.dateTo}>{formattedDateTo}</time>
      </div>
    </div>
  );
}

function BioCard({ user }) {
  const { openStateWithOverlay } = useUIStore();
  return (
    <div>
      <div className="relative flex flex-col gap-5 lg:gap-7.5 pt-2.5 md:pt-5 lg:pt-7.5 pb-10 lg:pb-15 border border-natural-charcoal/40 rounded-xl">
        <div
          className="w-1/2 max-h-50 max-w-50 aspect-square rounded-full shadow-md shadow-natural-charcoal/40 bg-cover bg-no-repeat bg-center mx-auto"
          style={{ backgroundImage: `url(${user.avatar.url})` }}
          aria-label={user.avatar.alt}
        />
        <div className="absolute z-20 top-0 right-0">
          <button
            className="p-2.5 rounded-xl hover:bg-deep-blue/20"
            onClick={() => {
              openStateWithOverlay("isEditProfileOpen");
            }}
          >
            <img src="/pen-solid.svg" alt="update image" className="h-5" />
          </button>
        </div>
        <div className="flex flex-col gap-2.5 lg:gap-3.75 text-center font-medium">
          <span className="capitalize text-xl-leading-none lg:text-2xl-leading-none">
            {user.name}
          </span>
          <span className="leading-none lg:text-xl-leading-none break-words">
            {user.email}
          </span>
        </div>
      </div>
    </div>
  );
}
