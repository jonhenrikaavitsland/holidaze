import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import useUIStore from "./js/store/useUIStore";
import LoginModal from "./component/LoginModal";
import RegisterModal from "./component/RegisterModal";
import Overlay from "./component/Overlay";
import EditProfileModal from "./component/EditProfileModal";
import AlertModal from "./component/AlertModal";

/**
 * Renders the overall layout of the Holidaze application, including the header, footer, main content area, and various modals.
 *
 * This component wraps the application's pages with a consistent layout. It includes:
 * - A `Header` component at the top.
 * - A `Footer` component at the bottom.
 * - A main content area (rendered via React Router's `<Outlet />`) where the routed pages are displayed.
 *
 * Additionally, the layout conditionally renders various modal components based on the UI state from `useUIStore`:
 * - `LoginModal` for user login.
 * - `RegisterModal` for user registration.
 * - `Overlay` to dim the background when a modal is active.
 * - `EditProfileModal` for editing the user's profile.
 * - `AlertModal` to display alert messages.
 *
 * The main content area applies an "overflow-hidden" class when an overlay is active to prevent background scrolling.
 *
 * @component
 * @example
 * // Example usage:
 * <Layout>
 *   <Outlet />
 * </Layout>
 *
 * @returns {JSX.Element} The rendered application layout.
 */
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
