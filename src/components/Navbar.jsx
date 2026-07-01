import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div>
          <h2>437 Air</h2>
          <p>In-Flight System</p>
        </div>
      </div>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/entertainment">Entertainment</NavLink>
        <NavLink to="/flight">Flight</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;