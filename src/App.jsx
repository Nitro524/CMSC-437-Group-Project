import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Entertainment from "./pages/Entertainment";
import Flight from "./pages/Flight";
import Services from "./pages/Services";
import Profile from "./pages/Profile";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="entertainment" element={<Entertainment />} />
          <Route path="flight" element={<Flight />} />
          <Route path="services" element={<Services />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;