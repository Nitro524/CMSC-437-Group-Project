import { useState } from "react";
import "../styles/Profile.css";

function Profile() {
  const savedMode = sessionStorage.getItem("userMode") || "guest";
  const savedName = sessionStorage.getItem("passengerName") || "Guest Passenger";

  const [mode] = useState(savedMode);
  const [name] = useState(savedName);

  const [textSize, setTextSize] = useState(
    sessionStorage.getItem("textSize") || "Normal"
  );

  const [theme, setTheme] = useState(
    sessionStorage.getItem("theme") || "Light"
  );

  function savePreferences() {
    if (mode === "guest") {
      alert("Guest users cannot save preferences.");
      return;
    }

    sessionStorage.setItem("textSize", textSize);
    sessionStorage.setItem("theme", theme);

    alert("Preferences saved for this flight session.");
    window.location.reload();
  }

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      <p className="profile-intro">
        Manage your passenger profile and flight session preferences.
      </p>

      <section className="profile-card">
        <h2>Current User</h2>
        <p>
          <strong>Mode:</strong> {mode === "guest" ? "Guest" : "Profile"}
        </p>
        <p>
          <strong>Name:</strong> {name}
        </p>

        {mode === "guest" && (
          <p className="guest-warning">
            Guest users can use the system, but preferences cannot be saved.
          </p>
        )}
      </section>

      <section className="profile-card">
        <h2>Preferences</h2>

        <div className="form-row">
          <div>
            <label>Text Size</label>
            <select
              value={textSize}
              onChange={(e) => setTextSize(e.target.value)}
            >
              <option>Normal</option>
              <option>Large</option>
            </select>
          </div>

          <div>
            <label>Theme</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
        </div>

        <button onClick={savePreferences}>Save Preferences</button>
      </section>
    </div>
  );
}

export default Profile;