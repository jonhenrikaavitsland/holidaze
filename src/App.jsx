import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import ListYourVenue from "./component/pages/ListYourVenue";
import useAuthStore from "./js/store/useAuthStore";
import VenuePage from "./component/pages/VenuePage";
import AccountPage from "./component/pages/AccountPage";
import BookingPage from "./component/pages/BookingPage";
import LocationPage from "./component/pages/LocationPage";
import Home from "./component/pages/Home";
import VenueHubPage from "./component/pages/VenueHubPage";
import DefaultPage from "./component/pages/DefaultPage";

/**
 * The main application component that defines the routing structure for the Holidaze app.
 *
 * This component sets up routes using React Router to render different pages based on the URL.
 * It uses the authentication store (`useAuthStore`) to conditionally render routes based on the user's status.
 *
 * Routes include:
 * - Home page ("/"): Renders the Home component.
 * - List Your Venue ("/list-your-venue/"):
 *    - If the user is not a venue manager, renders the ListYourVenue component.
 *    - Otherwise, redirects to the Venue HUB page.
 * - Venue HUB ("/venue-hub/"): Renders the VenueHubPage component (only for venue managers).
 * - Venue details ("/venue/:venueId"): Renders the VenuePage component.
 * - Venue booking ("/venue/:venueId/booking"): Renders the BookingPage component.
 * - Location page ("/locations/:locationName"): Renders the LocationPage component.
 * - Account page ("/account"): Renders the AccountPage component (only for logged-in users).
 * - Redirects for legacy or invalid paths.
 * - A catch-all route ("*") that renders the DefaultPage component for 404 errors.
 *
 * The routes are nested within a common layout provided by the Layout component.
 *
 * @component
 * @example
 * // Example usage:
 * <App />
 *
 * @returns {JSX.Element} The rendered application with routing.
 */
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
          <Route path="*" element={<DefaultPage />} />
        </Route>
      </Routes>
    </div>
  );
}
