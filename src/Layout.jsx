import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import useUIStore from "./js/store/useUIStore";
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal";
import Overlay from "./component/Overlay";

export default function Layout() {
  const { isOverlayOpen, isLoginModalOpen, isRegisterModalOpen } = useUIStore();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main
        className={`flex-grow lg:container lg:mx-auto mb-10 md:mb-15 lg:mb-20 ${isOverlayOpen ? "overflow-hidden" : ""}`}
      >
        <Outlet />
        {isLoginModalOpen ? <LoginModal /> : ""}
        {isRegisterModalOpen ? <RegisterModal /> : ""}
        {isOverlayOpen ? <Overlay /> : ""}
      </main>
      <Footer />
    </div>
  );
}
