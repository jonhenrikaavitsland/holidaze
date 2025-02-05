/* eslint-disable react/prop-types */
import { useState } from "react";
import Heading from "../../../component/Heading";
import Loader from "../../../component/Loader";
import HasNoVenues from "../HasNoVenues";
import HasVenues from "../HasVenues";
import useProfileVenues from "../../../js/api/useProfileVenues";

export default function ViewVenuesObject({
  handleViewChange,
  setCurrentVenue,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const { venues, meta, loading, error } = useProfileVenues({
    page: currentPage,
    limit: 10,
  });

  console.log("VENUES:", venues);

  return (
    <section className="flex flex-col gap-5 md:gap-7.5 lg:gap-10 mx-5 md:mx-7.5 lg:mx-10 mb-10 md:mb-15 lg:mb-20">
      {venues.length > 0 && (
        <Heading level="2" className="text-center text-custom-coral">
          venues
        </Heading>
      )}
      {loading ? (
        <div className="flex justify-center pt-10">
          <Loader />
        </div>
      ) : venues.length > 0 ? (
        <HasVenues
          venues={venues}
          meta={meta}
          error={error}
          setCurrentPage={setCurrentPage}
          handleViewChange={handleViewChange}
          setCurrentVenue={setCurrentVenue}
        />
      ) : (
        <HasNoVenues handleViewChange={handleViewChange} />
      )}
    </section>
  );
}
