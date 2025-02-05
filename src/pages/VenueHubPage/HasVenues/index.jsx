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
      <div>
        <button onClick={() => setCurrentPage(1)}>First</button>
        {meta.pageCount > 2 &&
          Array.from({ length: meta.pageCount - 2 }, (_, i) => i + 2).map(
            (page) => (
              <button key={page} onClick={() => setCurrentPage(page)}>
                {page}
              </button>
            ),
          )}
        <button onClick={() => setCurrentPage(meta.pageCount)}>Last</button>
      </div>
    </div>
  );
}
