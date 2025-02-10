/* eslint-disable react/prop-types */
export default function BtnCheckAvailability({ data, scrollToCalendar }) {
  return (
    <div>
      <button
        className="shadow-md shadow-natural-charcoal/40 sm:w-full"
        onClick={scrollToCalendar}
      >
        <div className="font-serif text-center bg-natural-charcoal text-white py-4 md:py-5 font-bold uppercase text-lg-leading-none md:text-xl-leading-none lg:text-2xl-leading-none w-48 md:w-56 lg:w-64 sm:w-full">
          <h2>{data.location.city}</h2>
        </div>
        <div className="text-center text-lg-leading-none md:text-xl-leading-none lg:text-2xl-leading-none font-bold py-2.5 md:py-5">
          <span>{`€${data.price} / Night`}</span>
        </div>
        <div className="font-serif text-center bg-deep-blue text-white text-xl-leading-none md:text-2xl-leading-none lg:text-3xl-leading-none font-bold capitalize py-3.75 md:py-5 lg:py-7.5 hover:bg-deep-blue/90">
          <p className="w-30 md:w-36 lg:w-44 mx-auto">check availability</p>
        </div>
      </button>
    </div>
  );
}
