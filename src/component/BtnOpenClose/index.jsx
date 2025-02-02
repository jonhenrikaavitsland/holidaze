/* eslint-disable react/prop-types */
export default function BtnOpenClose({ openState }) {
  return (
    <div className="absolute bottom-0 right-0">
      <button className="bg-deep-blue py-1.5 px-5 rounded-tl-xl rounded-br-xl hover:bg-deep-blue/90">
        <img
          src={"/chevron-down-solid.svg"}
          alt=""
          className={`h-5 ${openState ? "rotate-180" : ""}`}
        />
        <span className="sr-only text-white">toggle</span>
      </button>
    </div>
  );
}
