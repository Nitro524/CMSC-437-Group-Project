import { useState } from "react";
import food from "../data/food";
import drinks from "../data/drinks";
import "../styles/Food.css";

function Food() {
  const [category, setCategory] = useState("Food");
  const [selectedItem, setSelectedItem] = useState(null);

  const savedFavorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
  const [favorites, setFavorites] = useState(savedFavorites);

  const userMode = sessionStorage.getItem("userMode") || "guest";
  const allContent = [...food, ...drinks];

  const filteredContent =
    category === "Food"
      ? allContent.filter((item) => item.type === "Food")
      : category === "Drinks"
      ? allContent.filter((item) => item.type === "Drink")
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
        <h1>Food</h1>
        <p>
          Order food and drinks, straight to your seat.
        </p>
      </div>

      <div className="category-buttons">
        {["Food", "Drinks", "Favorites"].map(
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
              <img src={selectedItem.image} alt={selectedItem.name} />
            </div>

            <div>
              <span className="content-type">{selectedItem.type}</span>
              <h2>{selectedItem.name}</h2>

              {selectedItem.description && (
                <p>
                  <strong>Description:</strong> {selectedItem.description}
                </p>
              )}

              {selectedItem.price && (
                <p>
                  <strong>Price:</strong> {selectedItem.price}
                </p>
              )}

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
              No favorites saved yet. Add food or drinks to see them here.
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
                    <img src={item.image} alt={item.name} />
                  </div>

                  <span className="content-type">{item.type}</span>
                  <h3>{item.name}</h3>
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

export default Food;