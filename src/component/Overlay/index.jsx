import useUIStore from "../../js/store/useUIStore";

export default function Overlay() {
  const { closeAll, isAlertModalOpen } = useUIStore();

  return (
    <div
      className="absolute flex justify-end p-2.5 top-0 left-0 w-dvw h-dvh bg-natural-charcoal/80 z-40 cursor-pointer"
      onClick={closeAll}
    >
      <div className="lg:container lg:mx-auto flex w-full justify-center md:justify-end ">
        <div className={`${isAlertModalOpen ? "hidden" : ""}`}>
          <button className="p-2.5 hover:bg-white/20 rounded-xl">
            <img
              src="/xmark-solid-white.svg"
              alt="close"
              onClick={closeAll}
              className="w-6.5 h-6.5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
