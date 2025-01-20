import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import useUIStore from "./js/store/useUIStore";
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal";

export default function Layout() {
  const { isOverlayOpen, isLoginModalOpen, isRegisterModalOpen } = useUIStore();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main
        className={`flex-grow lg:container lg:mx-auto mb-10 md:mb-15 lg:mb-20 ${isOverlayOpen ? "overflow-hidden" : ""}`}
      >
        <Outlet />
        <Overlay />
        {isLoginModalOpen ? <LoginModal /> : ""}
        {isRegisterModalOpen ? <RegisterModal /> : ""}
      </main>
      <Footer />
    </div>
  );
}

function Overlay() {
  const { isOverlayOpen, closeAll } = useUIStore();

  return (
    <div
      className={
        isOverlayOpen
          ? "absolute flex justify-end p-2.5 top-0 left-0 w-dvw h-dvh bg-natural-charcoal/80 z-40 cursor-pointer"
          : "hidden"
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
  );
}
