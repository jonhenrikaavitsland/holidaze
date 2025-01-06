import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </div>
  );
}
