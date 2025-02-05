/* eslint-disable react/prop-types */
import VenueObject from "../VenueObject";

export default function HasVenues({
  venues,
  meta,
  error,
  setCurrentPage,
  handleViewChange,
  setCurrentVenue,
}) {
  console.log(meta, error, setCurrentPage);
  return (
    <div className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
      {venues.map((venue, index) => (
        <div key={index} className="flex flex-col gap-1">
          <span className="text-xs-leading-none">
            {index + 1} / {venues.length}
          </span>
          <VenueObject
            venue={venue}
            handleViewChange={handleViewChange}
            setCurrentVenue={setCurrentVenue}
          />
        </div>
      ))}
    </div>
  );
}
