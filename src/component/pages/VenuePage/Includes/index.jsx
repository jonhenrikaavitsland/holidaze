/* eslint-disable react/prop-types */
export default function Includes({ data }) {
  const included = {
    rating: `Rating of ${data.rating}`,
    sleeps: `Sleeps up to ${data.maxGuests}`,
    wifi: data.meta.wifi ? "WiFi is available" : null,
    breakfast: data.meta.breakfast ? "Breakfast is included" : null,
    pets: data.meta.pets ? "Pets are welcome" : null,
    parking: data.meta.parking ? "Parking is available" : null,
  };

  return (
    <div className="grow">
      <div className="bg-light-sky-blue rounded-xl pt-2.5 px-2.5 pb-5 md:pt-5 md:px-5 md:pb-10 lg:pt-7.5 lg:px-7.5 lg:pb-15 flex flex-col md:flex-row md:flex-wrap gap-2.5 md:gap-5 lg:gap-7.5 shadow-md shadow-natural-charcoal/40">
        {Object.entries(included).map(([key, value]) => {
          if (value) {
            return (
              <div
                key={key}
                className="flex gap-2.5 leading-none md:text-lg-leading-none lg:text-xl-leading-none md:w-1/3 grow lg:w-1/4"
              >
                <img
                  src="/logo_warm_200.png"
                  alt="icon"
                  className="h-4 md:h-4.5 lg:h-5"
                />
                <span>{value}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
