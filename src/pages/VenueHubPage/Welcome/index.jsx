/* eslint-disable react/prop-types */
import Heading from "../../../component/Heading";
import CreateNewBtn from "../CreateNewBtn";
import Paragraph from "../Paragraph";

export default function Welcome({ handleViewChange }) {
  return (
    <div className="flex flex-col gap-10 md:gap-15 mx-5 md:mx-7.5 lg:mx-10 mb-10 md:mb-15 lg:mb-20">
      <div className="flex flex-col gap-5 md:gap-7.5 md:text-lg lg:text-xl">
        <p>
          Welcome to the <span className="capitalize font-bold">venue HUB</span>{" "}
          — your central dashboard for managing your rental properties with ease
          and efficiency!
        </p>
        <p>
          Here in the Venue HUB, you have complete control over your listed
          venues and bookings. Whether you&apos;re managing a single cozy
          bungalow or a portfolio of stunning properties, Venue HUB provides you
          with the tools you need to succeed.
        </p>
      </div>
      <section className="flex flex-col gap-5 md:gap-7.5">
        <Heading level="2" className="text-center">
          What can you do in the venue HUB?
        </Heading>
        <Paragraph
          spanContent="view venues: "
          content="Keep track of all your listed properties in one convenient location. Update details, check availability, and ensure your venues are always presented at their best."
        />
        <Paragraph
          spanContent="view bookings: "
          content="Stay organized and never miss a booking! View upcoming reservations, manage inquiries, and maintain clear communication with your guests."
        />
        <Paragraph
          spanContent="create new venue: "
          content="Effortlessly add all your venues, wether it be one or many. Add amazing photos, write exciting descriptions and pick your amenities. Holidaze has you covered."
        />
      </section>
      <CreateNewBtn handleViewChange={handleViewChange} />
    </div>
  );
}
