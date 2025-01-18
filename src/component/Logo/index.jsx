/* eslint-disable react/prop-types */
export default function Logo(props) {
  return (
    <figure className="flex justify-center">
      <div className="flex flex-col items-center md:flex-row md:h-[75px] md:items-start w-min">
        <div className="w-[3.125rem]">
          <img src={`/logo_${props.color}_200.png`} alt="holidaze" />
        </div>
        <div className="md:h-full md:flex md:items-end">
          <span className="font-mono text-xl-leading-none text-deep-blue md:text-5xl-50">
            holidaze
          </span>
        </div>
      </div>
    </figure>
  );
}
