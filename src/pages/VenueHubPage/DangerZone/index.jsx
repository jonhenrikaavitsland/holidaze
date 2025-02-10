/* eslint-disable react/prop-types */
import DeleteVenueBtn from "../../../component/pages/VenueHubPage/DeleteVenueBtn";

export default function DangerZone({ id, handleViewChange }) {
  return (
    <section className="flex flex-col gap-10 md:gap-15 lg:gap-20 bg-custom-coral pt-5 md:pt-7.5 lg:pt-10 pb-10 md:pb-15 lg:pb-20">
      <h2 className="font-serif text-white text-center text-4xl-leading-none uppercase font-black underline">
        danger zone
      </h2>
      <DeleteVenueBtn id={id} handleViewChange={handleViewChange} />
    </section>
  );
}
