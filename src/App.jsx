import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import ListYourVenue from "./pages/ListYourVenue";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/list-your-venue/" element={<ListYourVenue />} />
        </Route>
      </Routes>
    </div>
  );
}
