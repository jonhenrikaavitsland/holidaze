import Heading from "../../Heading";
import Loader from "../../Loader";
import useUserBookings from "../../../js/api/useUserBookings";
import useAuthStore from "../../../js/store/useAuthStore";
import BioCard from "./BioCard";
import BookingCard from "./BookingCard";
import { useEffect } from "react";

/**
 * Renders the Account Page for the Holidaze application.
 *
 * This component displays the user's account information, including their bio (via the BioCard component)
 * and a list of their upcoming bookings (via the BookingCard component). It uses custom hooks to retrieve the
 * current authenticated user (from useAuthStore) and their bookings (from useUserBookings). While loading,
 * a Loader is displayed; if an error occurs, an error message is shown; and if no bookings exist, an informational
 * message is rendered.
 *
 * Additionally, the component sets the document title and meta description when it mounts to provide relevant
 * information for SEO and browser tab labeling.
 *
 * @component
 * @example
 * // Example usage:
 * <AccountPage />
 *
 * @returns {JSX.Element} The rendered Account Page component.
 */
export default function AccountPage() {
  const { user } = useAuthStore();
  const { bookings, loading, error } = useUserBookings();

  useEffect(() => {
    document.title = "Account || Holidaze";

    const metaDescription = document.querySelector('meta[name="description"]');
    const content =
      "Manage your account details and view your upcoming bookings with Holidaze.";
    if (metaDescription) {
      metaDescription.setAttribute("content", content);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

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
