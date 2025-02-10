/* eslint-disable react/prop-types */
export default function Address({ data }) {
  return (
    <div className="flex flex-col leading-none md:text-lg-leading-none lg:text-xl-leading-none gap-1 md:gap-2 lg:gap-3 justify-end">
      <span className="w-max">{data.name}</span>
      <span className="w-max">{data.location.address}</span>
      <span className="w-max">
        {data.location.zip} {data.location.city}
      </span>
      <span className="w-max">Fuerteventura, {data.location.country}</span>
    </div>
  );
}
