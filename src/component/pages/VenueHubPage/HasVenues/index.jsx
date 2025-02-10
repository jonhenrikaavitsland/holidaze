/* eslint-disable react/prop-types */
import LoadMore from "../../../LoadMore";
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
            {(meta.currentPage - 1) * 10 + (index + 1)} / {meta.totalCount}
          </span>
          <VenueObject
            venue={venue}
            handleViewChange={handleViewChange}
            setCurrentVenue={setCurrentVenue}
          />
        </div>
      ))}
      {meta.pageCount >= 2 && (
        <LoadMore
          setCurrentPage={setCurrentPage}
          meta={meta}
          headingContent="Load more venues"
        />
      )}
    </div>
  );
}
