import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { useCallback, useState } from "react";
import useUIStore from "./js/store/useUIStore";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const { isOverlayOpen, closeAll } = useUIStore();

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <main
        className={`flex-grow lg:container lg:mx-auto mb-10 md:mb-15 lg:mb-20 ${isOpen ? "overflow-hidden" : ""}`}
      >
        <Outlet />
        <div
          className={
            isOverlayOpen
              ? "absolute flex justify-end p-2.5 top-0 left-0 w-dvw h-dvh bg-natural-charcoal/80 z-30 cursor-pointer"
              : "collapse"
          }
          onClick={closeAll}
        >
          <div>
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
      </main>
      <Footer />
    </div>
  );
}
