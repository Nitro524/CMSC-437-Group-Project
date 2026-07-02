import { useState } from "react";
import movies from "../data/movies";
import music from "../data/music";
import "../styles/Entertainment.css";

function Entertainment() {
  const [category, setCategory] = useState("Trending");
  const [selectedItem, setSelectedItem] = useState(null);

  const savedFavorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
  const [favorites, setFavorites] = useState(savedFavorites);

  const userMode = sessionStorage.getItem("userMode") || "guest";
  const allContent = [...movies, ...music];

  const filteredContent =
    category === "Movies"
      ? allContent.filter((item) => item.type === "Movie")
      : category === "TV Shows"
      ? allContent.filter((item) => item.type === "TV Show")
      : category === "Music"
      ? allContent.filter((item) => item.type === "Music")
      : category === "Trending"
      ? allContent.filter((item) => item.trending)
      : category === "Recommended"
      ? allContent.filter((item) => item.recommended)
      : favorites;

  function isFavorite(item) {
    return favorites.some(
      (favorite) => favorite.id === item.id && favorite.type === item.type
    );
  }

  function toggleFavorite(item) {
    if (userMode === "guest") {
      alert("Guest users cannot save favorites. Please create a profile first.");
      return;
    }

    let updatedFavorites;

    if (isFavorite(item)) {
      updatedFavorites = favorites.filter(
        (favorite) => !(favorite.id === item.id && favorite.type === item.type)
      );
    } else {
      updatedFavorites = [...favorites, item];
    }

    setFavorites(updatedFavorites);
    sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }

  return (
    <div className="entertainment-page">
      <div className="entertainment-hero">
        <h1>Entertainment</h1>
        <p>
          Browse movies, TV shows, music, trending content, recommendations, and
          saved favorites.
        </p>
      </div>

      <div className="category-buttons">
        {["Trending", "Recommended", "Movies", "TV Shows", "Music", "Favorites"].map(
          (item) => (
            <button
              key={item}
              className={category === item ? "active-category" : ""}
              onClick={() => {
                setCategory(item);
                setSelectedItem(null);
              }}
            >
              {item}
            </button>
          )
        )}
      </div>

      {selectedItem ? (
        <section className="details-panel">
          <button className="back-button" onClick={() => setSelectedItem(null)}>
            ← Back to Catalog
          </button>

          <div className="details-content">
            <div className="details-poster">
              <img src={selectedItem.image} alt={selectedItem.title} />
            </div>

            <div>
              <span className="content-type">{selectedItem.type}</span>
              <h2>{selectedItem.title}</h2>

              <p>
                <strong>Genre:</strong> {selectedItem.genre}
              </p>

              {selectedItem.synopsis && (
                <p>
                  <strong>Synopsis:</strong> {selectedItem.synopsis}
                </p>
              )}

              {selectedItem.cast && (
                <p>
                  <strong>Cast:</strong> {selectedItem.cast}
                </p>
              )}

              {selectedItem.artist && (
                <p>
                  <strong>Artist:</strong> {selectedItem.artist}
                </p>
              )}

              <p>
                <strong>Duration:</strong> {selectedItem.duration}
              </p>

              <p>
                <strong>Rating:</strong> {selectedItem.rating}
              </p>

              <button
                className="favorite-button"
                onClick={() => toggleFavorite(selectedItem)}
              >
                {isFavorite(selectedItem)
                  ? "❤️ Favorited"
                  : "♡ Add to Favorites"}
              </button>
            </div>
          </div>
        </section>
      ) : (
        <>
          <h2>{category} Catalog</h2>

          {category === "Favorites" && favorites.length === 0 ? (
            <p className="empty-message">
              No favorites saved yet. Add movies, TV shows, or music to see them here.
            </p>
          ) : (
            <div className="content-grid">
              {filteredContent.map((item) => (
                <div
                  className="content-card"
                  key={`${item.type}-${item.id}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="poster">
                    <img src={item.image} alt={item.title} />
                  </div>

                  <span className="content-type">{item.type}</span>
                  <h3>{item.title}</h3>
                  <p>{item.genre}</p>

                  <button
                    className="favorite-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item);
                    }}
                  >
                    {isFavorite(item) ? "❤️ Favorited" : "♡ Add to Favorites"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Entertainment;