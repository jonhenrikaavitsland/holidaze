/* eslint-disable react/prop-types */
export default function NamePlate({ location }) {
  return (
    <div className="flex flex-col items-end justify-end">
      <div className="bg-custom-coral text-white font-serif font-bold text-lg-leading-none md:text-2xl-leading-none py-4 px-5 md:px-7.5 md:py-5 w-48 md:w-64">
        <h3>{location.name}</h3>
      </div>
    </div>
  );
}
