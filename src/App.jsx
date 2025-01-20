import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import ListYourVenue from "./pages/ListYourVenue";
import useAuthStore from "./js/store/useAuthStore";

export default function App() {
  const { isVenueManager } = useAuthStore();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {!isVenueManager ? (
            <Route path="/list-your-venue/" element={<ListYourVenue />} />
          ) : (
            <Route
              path="/list-your-venue/"
              element={<Navigate to="/venue-hub/" replace />}
            />
          )}
          {/* Catch-all 404 route */}
          {/* <Route path='*' element={<NotFound />} /> */}
        </Route>
      </Routes>
    </div>
  );
}
