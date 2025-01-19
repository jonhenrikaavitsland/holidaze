/* eslint-disable react/prop-types */
export default function Logo(props) {
  return (
    <figure className="flex justify-center">
      <div
        className={`flex flex-col items-center ${props.modal ? "" : "md:flex-row md:h-[75px] md:items-start w-min"}`}
      >
        <div className="w-[3.125rem]">
          <img src="/logo_warm_200.png" alt="holidaze" />
        </div>
        <div className={props.modal ? "" : "md:h-full md:flex md:items-end"}>
          <span
            className={`font-mono text-xl-leading-none text-${props.color} ${props.modal ? "" : "md:text-5xl-50"}`}
          >
            holidaze
          </span>
        </div>
      </div>
    </figure>
  );
}
