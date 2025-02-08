import useCreateVenueStore from "../../../js/store/useCreateVenueStore";

/* eslint-disable react/prop-types */
export default function CreateNewBtn({ handleViewChange }) {
  const { clearAll } = useCreateVenueStore();
  return (
    <div className="mx-auto">
      <button
        className="font-serif font-bold text-2xl-leading-none md:text-3xl-leading-none lg:text-4xl-leading-none text-white bg-deep-blue py-3.75 px-7.5 md:py-5 md:px-10 lg:py-7.5 lg:px-15 rounded-xl shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/90"
        onClick={() => {
          clearAll();
          handleViewChange("newVenue");
        }}
      >
        create new venue
      </button>
    </div>
  );
}
