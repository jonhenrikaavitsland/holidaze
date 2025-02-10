/* eslint-disable react/prop-types */
import Heading from "../../../Heading";

export default function FourThings({ thing, index }) {
  // Determine the grid positioning based on the index
  const gridClasses =
    index % 2 === 1
      ? "lg:col-start-2 lg:col-end-3"
      : "lg:col-start-1 lg:col-end-2";
  return (
    <div className="flex flex-col gap-3.75 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:mx-10 lg:gap-x-10 lg:gap-y-5">
      <Heading level="3" className="mx-5 md:mx-7.5 lg:mx-0">
        {thing.title}
      </Heading>
      <img
        src={thing.image.url}
        alt={thing.image.alt}
        className={`sm:mx-0 mx-5 md:mx-7.5 lg:mx-0 ${gridClasses} row-span-full`}
      />
      <p className="mx-5 md:mx-7.5 lg:mx-0 md:text-lg lg:text-xl">
        {thing.description}
      </p>
    </div>
  );
}
