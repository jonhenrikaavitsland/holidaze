/* eslint-disable react/prop-types */
export default function IconSun({ isHovered }) {
  return (
    <figure className="p-2.5 md:p-7.5">
      <img
        src={isHovered ? "/logo_warm_200.png" : "/logo_white_200.png"}
        alt={isHovered ? "yellow sun" : "white sun"}
        className="h-13 w-13 md:h-25 md:w-25"
      />
    </figure>
  );
}
