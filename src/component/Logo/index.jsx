import { useNavigate } from "react-router-dom";
import useUIStore from "../../js/store/useUIStore";

/* eslint-disable react/prop-types */
export default function Logo(props) {
  const navigate = useNavigate();
  const { isMenuOpen } = useUIStore();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <figure
      className="flex justify-center cursor-pointer"
      onClick={!isMenuOpen ? handleClick : undefined}
    >
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
