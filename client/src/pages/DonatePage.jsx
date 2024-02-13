import React, { useState, useEffect } from "react";
import "../index.css";

const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="/logo_only_b_g_y.svg"
        alt="DNACollaborator logo"
        style={{ width: "25%", height: "auto" }}
      />
      <div className="description">
        <h3>DNACollaborator Donation</h3>
        <h5>$10.00</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button className="donate-button" type="submit">Donate</button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
}
