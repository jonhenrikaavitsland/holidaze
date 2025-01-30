import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import ListYourVenue from "./pages/ListYourVenue";
import useAuthStore from "./js/store/useAuthStore";
import CreateNewVenue from "./pages/CreateNewVenue";
import VenuePage from "./pages/VenuePage";
import LocationPage from "./pages/LocationPage/index.";
import BookingPage from "./pages/BookingPage";

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
          <Route
            path="/venue-hub/create-new-venue/"
            element={<CreateNewVenue />}
          />
          <Route path="/venue/:venueId" element={<VenuePage />} />
          <Route path="/venue/:venueId/booking" element={<BookingPage />} />
          <Route path="/locations/:locationName" element={<LocationPage />} />
          {/* Redirects */}
          <Route path="/venue" element={<Navigate to="/" replace />} />
          <Route path="/locations" element={<Navigate to="/" replace />} />
          {/* Catch-all 404 route */}
          {/* <Route path='*' element={<NotFound />} /> */}
        </Route>
      </Routes>
    </div>
  );
}
