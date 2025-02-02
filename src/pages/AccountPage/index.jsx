/* eslint-disable react/prop-types */
import Heading from "../../component/Heading";
import Loader from "../../component/Loader";
import useUserBookings from "../../js/api/useUserBookings";
import useAuthStore from "../../js/store/useAuthStore";

export default function AccountPage() {
  const { user } = useAuthStore();
  const { bookings, loading, error } = useUserBookings();
  console.log("bookings:", bookings);

  return (
    <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 px-5 md:px-7.5 lg:px-10 pt-5 md:pt-7.5 lg:pt-10 pb-10 md:pb-15 lg:pb-20">
      <Heading level="1" className="text-center text-deep-blue">
        Account
      </Heading>
      <div className="flex flex-col gap-10">
        <BioCard user={user} />
        <section>
          <Heading level="2" className="text-center text-deep-blue">
            Upcoming bookings
          </Heading>
        </section>
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
          <ul className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
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
      </div>
    </section>
  );
}

function BookingCard({ booking, index, maxNum }) {
  const dateFromObj = new Date(booking.dateFrom);
  const dateToObj = new Date(booking.dateTo);

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

  return (
    <div>
      <span className="text-xs-leading-none">
        {index + 1} / {maxNum}
      </span>
      <section className="relative flex flex-col gap-2.5 bg-light-sky-blue pt-2.5 px-2.5 pb-7.5">
        <Heading level="3" className="text-deep-blue">
          {booking.venue.name}
        </Heading>
        <div className="flex flex-col gap-2.5">
          <span className="leading-none">
            {booking.venue.location.city}, Fuerteventura
          </span>
          <span className="leading-none">{booking.venue.location.country}</span>
          <span className="leading-none">
            <time className="" dateTime={booking.dateFrom}>
              {formattedDateFrom}
            </time>{" "}
            - <time dateTime={booking.dateTo}>{formattedDateTo}</time>
          </span>
        </div>
      </section>
    </div>
  );
}

function BioCard({ user }) {
  return (
    <div className="relative flex flex-col gap-5 lg:gap-7.5 pt-2.5 md:pt-5 lg:pt-7.5 pb-10 lg:pb-15 border border-natural-charcoal/40 rounded-xl">
      <div
        className="w-1/2 max-h-50 max-w-50 aspect-square rounded-full shadow-md shadow-natural-charcoal/40 bg-cover bg-no-repeat bg-center mx-auto"
        style={{ backgroundImage: `url(${user.avatar.url})` }}
        aria-label={user.avatar.alt}
      />
      <div className="absolute z-20 top-0 right-0">
        <button className="p-2.5 rounded-xl">
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
  );
}
