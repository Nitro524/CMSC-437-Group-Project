import { useState } from "react";
import food from "../data/food";
import drinks from "../data/drinks";
import "../styles/Food.css";

function Food() {
  const [category, setCategory] = useState("Food");
  const [selectedItem, setSelectedItem] = useState(null);

  const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(savedCart);

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    seatNumber: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });

  const userMode = sessionStorage.getItem("userMode") || "guest";
  const allContent = [...food, ...drinks];

  const filteredContent =
    category === "Food"
      ? allContent.filter((item) => item.type === "Food")
      : category === "Drinks"
      ? allContent.filter((item) => item.type === "Drink")
      : [];

  function getCartEntry(item) {
    return cart.find(
      (entry) => entry.id === item.id && entry.type === item.type
    );
  }

  function saveCart(updatedCart) {
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  function addToCart(item, quantity = 1) {
    if (userMode === "guest") {
      alert("Guest users cannot order. Please create a profile first.");
      return;
    }

    const existing = getCartEntry(item);
    let updatedCart;

    if (existing) {
      updatedCart = cart.map((entry) =>
        entry.id === item.id && entry.type === item.type
          ? { ...entry, quantity: entry.quantity + quantity }
          : entry
      );
    } else {
      updatedCart = [...cart, { ...item, quantity }];
    }

    saveCart(updatedCart);
  }

  function changeQuantity(item, delta) {
    const existing = getCartEntry(item);
    if (!existing) return;

    const newQuantity = existing.quantity + delta;

    let updatedCart;
    if (newQuantity <= 0) {
      updatedCart = cart.filter(
        (entry) => !(entry.id === item.id && entry.type === item.type)
      );
    } else {
      updatedCart = cart.map((entry) =>
        entry.id === item.id && entry.type === item.type
          ? { ...entry, quantity: newQuantity }
          : entry
      );
    }

    saveCart(updatedCart);
  }

  function removeFromCart(item) {
    const updatedCart = cart.filter(
      (entry) => !(entry.id === item.id && entry.type === item.type)
    );
    saveCart(updatedCart);
  }

  function parsePrice(price) {
    if (!price) return 0;
    const parsed = parseFloat(String(price).replace(/[^0-9.]/g, ""));
    return isNaN(parsed) ? 0 : parsed;
  }

  const cartCount = cart.reduce((sum, entry) => sum + entry.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, entry) => sum + parsePrice(entry.price) * entry.quantity,
    0
  );

  function handleCheckoutFieldChange(field, value) {
    setCheckoutForm((prev) => ({ ...prev, [field]: value }));
  }

  function openCheckout() {
    if (userMode === "guest") {
      alert("Guest users cannot order. Please create a profile first.");
      return;
    }
    if (cart.length === 0) return;
    setCheckoutOpen(true);
  }

  function placeOrder(e) {
    e.preventDefault();

    if (!checkoutForm.name.trim() || !checkoutForm.seatNumber.trim()) {
      alert("Please enter your name and seat number to place the order.");
      return;
    }

    // Card details are optional — if provided, they'd be sent to a payment
    // processor here. If left blank, the order is billed to the seat.
    setOrderConfirmed(true);
    saveCart([]);
    setCheckoutOpen(false);
  }

  function startNewOrder() {
    setOrderConfirmed(false);
    setCheckoutForm({
      name: "",
      seatNumber: "",
      cardNumber: "",
      cardExpiry: "",
      cardCVC: "",
    });
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
        {["Food", "Drinks", "Cart"].map((item) => (
          <button
            key={item}
            className={category === item ? "active-category" : ""}
            onClick={() => {
              setCategory(item);
              setSelectedItem(null);
            }}
          >
            {item === "Cart" ? `Cart (${cartCount})` : item}
          </button>
        ))}
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

              {getCartEntry(selectedItem) ? (
                <div className="quantity-stepper">
                  <button onClick={() => changeQuantity(selectedItem, -1)}>−</button>
                  <span>{getCartEntry(selectedItem).quantity} in cart</span>
                  <button onClick={() => changeQuantity(selectedItem, 1)}>+</button>
                </div>
              ) : (
                <button
                  className="favorite-button"
                  onClick={() => addToCart(selectedItem)}
                >
                  + Add to Order
                </button>
              )}
            </div>
          </div>
        </section>
      ) : category === "Cart" ? (
        <section className="cart-panel">
          <h2>Your Order</h2>

          {orderConfirmed ? (
            <div className="order-confirmation">
              <p>
                Thanks, {checkoutForm.name}! Your order has been sent to seat{" "}
                {checkoutForm.seatNumber}.
              </p>
              <button className="favorite-button" onClick={startNewOrder}>
                Start a New Order
              </button>
            </div>
          ) : cart.length === 0 ? (
            <p className="empty-message">
              Your cart is empty. Add food or drinks to place an order.
            </p>
          ) : (
            <>
              <div className="content-grid">
                {cart.map((entry) => (
                  <div className="content-card" key={`${entry.type}-${entry.id}`}>
                    <div className="poster">
                      <img src={entry.image} alt={entry.name} />
                    </div>

                    <span className="content-type">{entry.type}</span>
                    <h3>{entry.name}</h3>
                    {entry.price && (
                      <p>
                        {entry.price} × {entry.quantity} = $
                        {(parsePrice(entry.price) * entry.quantity).toFixed(2)}
                      </p>
                    )}

                    <div className="quantity-stepper">
                      <button onClick={() => changeQuantity(entry, -1)}>−</button>
                      <span>{entry.quantity}</span>
                      <button onClick={() => changeQuantity(entry, 1)}>+</button>
                    </div>

                    <button
                      className="favorite-button"
                      onClick={() => removeFromCart(entry)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <p>
                  <strong>Total:</strong> ${cartTotal.toFixed(2)}
                </p>
                <button className="favorite-button" onClick={openCheckout}>
                  Proceed to Checkout
                </button>
              </div>

              {checkoutOpen && (
                <form className="checkout-form" onSubmit={placeOrder}>
                  <h3>Checkout</h3>

                  <label>
                    Name
                    <input
                      type="text"
                      value={checkoutForm.name}
                      onChange={(e) =>
                        handleCheckoutFieldChange("name", e.target.value)
                      }
                      required
                    />
                  </label>

                  <label>
                    Seat Number
                    <input
                      type="text"
                      value={checkoutForm.seatNumber}
                      onChange={(e) =>
                        handleCheckoutFieldChange("seatNumber", e.target.value)
                      }
                      required
                    />
                  </label>

                  <p className="checkout-note">
                    Card details are optional. Leave blank to bill the order to
                    your seat instead.
                  </p>

                  <label>
                    Card Number (optional)
                    <input
                      type="text"
                      value={checkoutForm.cardNumber}
                      onChange={(e) =>
                        handleCheckoutFieldChange("cardNumber", e.target.value)
                      }
                      placeholder="•••• •••• •••• ••••"
                    />
                  </label>

                  <label>
                    Expiry (optional)
                    <input
                      type="text"
                      value={checkoutForm.cardExpiry}
                      onChange={(e) =>
                        handleCheckoutFieldChange("cardExpiry", e.target.value)
                      }
                      placeholder="MM/YY"
                    />
                  </label>

                  <label>
                    CVC (optional)
                    <input
                      type="text"
                      value={checkoutForm.cardCVC}
                      onChange={(e) =>
                        handleCheckoutFieldChange("cardCVC", e.target.value)
                      }
                      placeholder="123"
                    />
                  </label>

                  <button type="submit" className="favorite-button">
                    Place Order (${cartTotal.toFixed(2)})
                  </button>
                </form>
              )}
            </>
          )}
        </section>
      ) : (
        <>
          <h2>{category} Catalog</h2>

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

                {getCartEntry(item) ? (
                  <div
                    className="quantity-stepper"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button onClick={() => changeQuantity(item, -1)}>−</button>
                    <span>{getCartEntry(item).quantity}</span>
                    <button onClick={() => changeQuantity(item, 1)}>+</button>
                  </div>
                ) : (
                  <button
                    className="favorite-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                    }}
                  >
                    + Add to Order
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Food;
