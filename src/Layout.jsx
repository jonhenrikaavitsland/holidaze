import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import useUIStore from "./js/store/useUIStore";
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal";
import Overlay from "./component/Overlay";
import EditProfileModal from "./component/EditProfileModal";
import AlertModal from "./component/AlertModal";

export default function Layout() {
  const {
    isOverlayOpen,
    isLoginModalOpen,
    isRegisterModalOpen,
    isEditProfileOpen,
    isAlertModalOpen,
  } = useUIStore();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main
        className={`flex-grow lg:container lg:mx-auto ${isOverlayOpen ? "overflow-hidden" : ""}`}
      >
        <Outlet />
        {isLoginModalOpen && <LoginModal />}
        {isRegisterModalOpen && <RegisterModal />}
        {isOverlayOpen && <Overlay />}
        {isEditProfileOpen && <EditProfileModal />}
        {isAlertModalOpen && <AlertModal />}
      </main>
      <Footer />
    </div>
  );
}
