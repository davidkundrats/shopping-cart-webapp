import React, { useContext, useState } from "react";
import { ShopContext } from "../context/shop-context";
import CartItem from "../components/CartItem";
import allProducts from "../data/fulldata";
import "../cart.css";
import { useNavigate } from "react-router-dom";


export default function Cart({ inCheckout = false }) {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();



  return (
    <aside className="cart">
      <div>
        <h1>Your Cart:</h1>
      </div>
      <div>
        {allProducts.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>

      <div className="checkout">
        <p>Subtotal: ${totalAmount}</p>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
        {!inCheckout && (
          <button onClick={() => navigate("/checkout")}>Checkout</button>
        )}
      </div>
    </aside>
  );
}
