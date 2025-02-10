import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import ListYourVenue from "./component/pages/ListYourVenue";
import useAuthStore from "./js/store/useAuthStore";
import VenueHubPage from "./pages/VenueHubPage";
import VenuePage from "./component/pages/VenuePage";
import AccountPage from "./component/pages/AccountPage";
import BookingPage from "./component/pages/BookingPage";
import LocationPage from "./component/pages/LocationPage";

export default function App() {
  const { isVenueManager, isLoggedIn } = useAuthStore();

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
          {isVenueManager && (
            <Route path="/venue-hub/" element={<VenueHubPage />} />
          )}
          <Route path="/venue/:venueId" element={<VenuePage />} />
          <Route path="/venue/:venueId/booking" element={<BookingPage />} />
          <Route path="/locations/:locationName" element={<LocationPage />} />
          {isLoggedIn && <Route path="/account" element={<AccountPage />} />}
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
