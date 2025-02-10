/* eslint-disable react/prop-types */
import Heading from "../../../component/Heading";
import CreateNewBtn from "../CreateNewBtn";
import Paragraph from "../../../component/pages/VenueHubPage/Paragraph";

export default function HasNoVenues({ handleViewChange }) {
  return (
    <div className="flex flex-col gap-10 md:gap-15 lg:gap-10 mb-10 md:mb-15 lg:mb-20">
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <Heading level="2" className="text-center">
          no venues yet? let&apos;s get started!
        </Heading>
        <p className="md:text-lg lg:text-xl">
          Hi there, it looks like you haven&apos;t listed any venues on Holidaze
          just yet. Don&apos;t miss out on the opportunity to turn your property
          into a destination for eager holidaymakers! Listing your venue is
          quick, easy, and comes with plenty of benefits:
        </p>
      </section>
      <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
        <Heading level="3">why list your venue on holidaze?</Heading>
        <Paragraph
          spanContent="reach more guests: "
          content="Tap into a growing community of travelers searching for their next getaway."
        />
        <Paragraph
          spanContent="maximize earnings: "
          content="Turn your property into a source of income, whether it’s a spare room, a cozy cabin, or a luxurious estate."
        />
        <Paragraph
          spanContent="easy management: "
          content="With our Venue HUB, managing your bookings, availability, and guest communication has never been simpler."
        />
        <Paragraph
          spanContent="showcase your space: "
          content="Our platform lets you highlight your venue’s unique features with photos, descriptions, and amenities that stand out."
        />
      </section>
      <p className="text-center font-serif text-xl md:text-2xl lg:text-3xl font-bold">
        Take the first step today—your future guests are waiting to discover
        your property.
      </p>
      <CreateNewBtn handleViewChange={handleViewChange} />
    </div>
  );
}
