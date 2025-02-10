/* eslint-disable react/prop-types */
export default function DisplayMeta({ meta }) {
  return (
    <ul className="flex flex-col gap-1 leading-none md:text-lg-leading-none lg:text-xl-leading-none list-disc ms-5 md:ms-7.5 lg:ms-10">
      {meta.wifi && (
        <li>
          <span>WiFi is included</span>
        </li>
      )}
      {meta.breakfast && (
        <li>
          <span>Breakfast is included</span>
        </li>
      )}
      {meta.parking && (
        <li>
          <span>Parking is available</span>
        </li>
      )}
      {meta.pets && (
        <li>
          <span>Pets are welcome</span>
        </li>
      )}
    </ul>
  );
}
