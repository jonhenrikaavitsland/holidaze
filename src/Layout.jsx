import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow py-6 px-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
