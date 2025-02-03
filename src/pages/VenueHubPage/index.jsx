// import { useState } from 'react';
import Heading from "../../component/Heading";

/* eslint-disable react/prop-types */
export default function VenueHubPage() {
  // const [viewBooking, setViewBooking] = useState(false);
  // const [viewVenues, setViewVenues] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="hidden lg:block bg-warm-beige p-10 w-56 border-r border-natural-charcoal/40 min-h-full">
        <div className="mt-17.5">
          <ul className="flex flex-col gap-10">
            <LinkBtn content="view bookings" />
            <LinkBtn content="view venues" />
            <LinkBtn content="new venue" />
          </ul>
        </div>
      </div>
      <section className="lg:grow pt-5 md:pt-7.5 lg:pt-10">
        <Heading level="1" className="text-center text-deep-blue">
          venue hUB
        </Heading>
        <Buttons />
      </section>
    </div>
  );
}

function Buttons() {
  return (
    <div className="flex w-full mt-5 mb-10 md:mt-7.5 md:mb-15">
      <ul className="lg:hidden mx-auto text-center bg-warm-beige sm:w-48 w-64">
        <LinkBtn
          content="view bookings"
          className=" hover:font-medium w-full"
        />
        <LinkBtn
          content="view venues"
          className="border-t border-b border-natural-charcoal/40 w-full hover:font-medium"
        />
        <LinkBtn content="new venue" className="w-full hover:font-medium" />
      </ul>
    </div>
  );
}

function LinkBtn(props) {
  return (
    <li>
      <button
        className={`font-serif text-xl-leading-none py-2.5 capitalize ${props.className}`}
      >
        {props.content}
      </button>
    </li>
  );
}
