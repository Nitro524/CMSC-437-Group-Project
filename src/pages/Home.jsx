import { NavLink } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const passengerName =
    sessionStorage.getItem("passengerName") || "Guest Passenger";

  return (
    <div className="home-page">
      <section className="home-hero">
        <div>
          <h1>Welcome Aboard, {passengerName}</h1>
          <p>
            Enjoy movies, music, shopping, food ordering, and in-flight services
            during your trip.
          </p>
        </div>

        <div className="flight-summary">
          <h2>Flight 437</h2>
          <p>Baltimore → Los Angeles</p>
          <p>Estimated Arrival: 6:45 PM</p>
        </div>
      </section>

      <section className="home-cards">
        <NavLink to="/app/entertainment" className="home-card">
          <h2>Entertainment</h2>
          <p>Browse movies, TV shows, music, trending, and favorites.</p>
        </NavLink>

        <NavLink to="/app/flight" className="home-card">
          <h2>Flight</h2>
          <p>View flight updates, safety information, and announcements.</p>
        </NavLink>

        <NavLink to="/app/shop" className="home-card">
          <h2>Shop</h2>
          <p>Explore duty-free products and in-flight shopping.</p>
        </NavLink>

        <NavLink to="/app/food" className="home-card">
          <h2>Food</h2>
          <p>Browse meals, drinks, and place an in-flight order.</p>
        </NavLink>

        <NavLink to="/app/profile" className="home-card">
          <h2>Profile</h2>
          <p>Manage your profile and session preferences.</p>
        </NavLink>
      </section>
    </div>
  );
}

export default Home;