import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { useCallback, useState } from "react";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <main className="flex-grow">
        <Outlet />
        <div
          className={
            isOpen
              ? "absolute top-0 left-0 w-dvw h-dvh bg-natural-charcoal/80 z-10 overflow-hidden cursor-pointer"
              : "collapse"
          }
          onClick={toggleMenu}
        ></div>
      </main>
      <Footer />
    </div>
  );
}
