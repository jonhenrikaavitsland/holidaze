import Heading from "../../Heading";
import Loader from "../../Loader";
import useUserBookings from "../../../js/api/useUserBookings";
import useAuthStore from "../../../js/store/useAuthStore";
import BioCard from "./BioCard";
import BookingCard from "./BookingCard";

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
