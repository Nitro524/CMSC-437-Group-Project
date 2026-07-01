export default Profile;

function Profile() {
  return (
    <div>
      <h1>Profile</h1>

      <section>
        <h2>Continue as Guest</h2>
        <p>Guest users can use the system, but preferences will not be saved.</p>
        <button>Continue as Guest</button>
      </section>

      <section>
        <h2>Create Profile</h2>
        <input placeholder="Enter passenger name" />
        <button>Create Profile</button>
      </section>

      <section>
        <h2>Preferences</h2>
        <label>Language</label>
        <select>
          <option>English</option>
          <option>Spanish</option>
          <option>Japanese</option>
        </select>

        <label>Text Size</label>
        <select>
          <option>Normal</option>
          <option>Large</option>
        </select>

        <button>Save Preferences</button>
      </section>
    </div>
  );
}