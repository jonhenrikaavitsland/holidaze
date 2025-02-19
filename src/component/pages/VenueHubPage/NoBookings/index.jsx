import Heading from "../../../Heading";
import Paragraph from "../Paragraph";

/**
 * Renders an informational page for venue managers when no bookings have been made yet.
 *
 * This component displays a series of sections that:
 * - Reassure the venue manager that bookings are on the way.
 * - Provide tips to enhance the venue profile, such as adding high-quality photos,
 *   writing an engaging description, setting competitive pricing, listing key amenities, and collecting reviews.
 * - Conclude with a motivational message encouraging collaboration to make the venue a must-visit destination.
 *
 * The component makes use of the following subcomponents:
 * - **Heading**: For displaying section headings.
 * - **Paragraph**: For displaying tip details with emphasized span content.
 *
 * @component
 * @example
 * // Example usage:
 * <NoBookings />
 *
 * @returns {JSX.Element} The rendered informational page when there are no bookings.
 */
export default function NoBookings() {
  return (
    <div className="flex flex-col gap-10 md:gap-15 lg:gap-20 mb-10 md:mb-15 lg:mb-20">
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <Heading level="2" className="text-center">
          No Bookings Yet? Don’t Worry — We’re on It!
        </Heading>
        <p className="md:text-lg lg:text-xl">
          Hi there, valued Venue Manager! While you don’t have any bookings just
          yet, rest assured that we’re working behind the scenes to connect you
          with eager holidaymakers. In the meantime, this is the perfect
          opportunity to ensure your venue profile stands out and catches the
          eye of potential guests.
        </p>
      </section>
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <Heading level="3">tips to enhance your venue profile:</Heading>
        <Paragraph
          spanContent={"Add High-Quality Photos: "}
          content={
            "Guests are drawn to visuals, so upload clear, well-lit photos of your property. Show off the best features—like cozy interiors, stunning views, or unique amenities."
          }
        />
        <Paragraph
          spanContent={"Write an Engaging Description: "}
          content={
            "Highlight what makes your venue special. Mention nearby attractions, family-friendly features, or luxurious touches like a fireplace or hot tub."
          }
        />
        <Paragraph
          spanContent={"Set Competitive Pricing: "}
          content={
            "Research similar properties in your area and adjust your rates to attract early interest. Consider offering discounts for longer stays or first-time bookings."
          }
        />
        <Paragraph
          spanContent={"List Key Amenities: "}
          content={
            "Ensure your profile is up-to-date with everything your venue offers—Wi-Fi, parking, pet-friendliness, or even extras like bikes or BBQ equipment."
          }
        />
        <Paragraph
          spanContent={"Collect Reviews: "}
          content={
            "Encourage past guests (if you have them) to leave reviews. If you're just starting, a few kind words from friends or family who've stayed can help build credibility."
          }
        />
      </section>
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <p>
          The Holidaze team is committed to getting your venue noticed by
          travelers seeking their perfect getaway. In the meantime, these steps
          can make your listing even more irresistible.
        </p>
        <Heading level="2" className="text-center">
          Let’s work together to make your venue a must-visit destination!
        </Heading>
      </section>
    </div>
  );
}
