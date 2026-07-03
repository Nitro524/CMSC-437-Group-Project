import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>437 Air</h2>
        <p>In-Flight System</p>
      </div>

      <div className="nav-links">
        <NavLink to="/app">Home</NavLink>
        <NavLink to="/app/entertainment">Entertainment</NavLink>
        <NavLink to="/app/flight">Flight</NavLink>
        <NavLink to="/app/shop">Shop</NavLink>
        <NavLink to="/app/food">Food</NavLink>
        <NavLink to="/app/profile">Profile</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;