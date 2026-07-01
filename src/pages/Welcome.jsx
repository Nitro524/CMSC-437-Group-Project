import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

function Welcome() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function continueAsGuest() {
    sessionStorage.setItem("userMode", "guest");
    sessionStorage.setItem("passengerName", "Guest Passenger");
    navigate("/app");
  }

  function createProfile() {
    if (name.trim() === "") {
      alert("Please enter a passenger name.");
      return;
    }

    sessionStorage.setItem("userMode", "profile");
    sessionStorage.setItem("passengerName", name);
    navigate("/app");
  }

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1>Welcome to 437 Air</h1>
        <p>
          Continue as a guest or create a profile to save preferences during the
          flight session.
        </p>

        <button className="guest-button" onClick={continueAsGuest}>
          Continue as Guest
        </button>

        <div className="divider">or</div>

        <div className="profile-form">
          <label>Passenger Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={createProfile}>Create Profile</button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;