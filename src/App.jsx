import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Entertainment from "./pages/Entertainment";
import Shop from "./pages/Shop";
import Food from "./pages/Food";
import Profile from "./pages/Profile";
import "./styles/App.css";
import Flight from "./pages/Flight";

function App() {
  const theme = sessionStorage.getItem("theme") || "Light";
  const textSize = sessionStorage.getItem("textSize") || "Normal";

  return (
    <div className={`app ${theme.toLowerCase()} ${textSize.toLowerCase()}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />

          <Route path="/app" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="entertainment" element={<Entertainment />} />
            <Route path="flight" element={<Flight />} />
            <Route path="shop" element={<Shop />} />
            <Route path="food" element={<Food />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;