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
      <main className="flex-grow py-6 px-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
