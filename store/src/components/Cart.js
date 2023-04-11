import React, { useContext, useState } from "react";
import { ShopContext } from "../context/shop-context";
import CartItem from "./CartItem";
import allProducts from "../data/fulldata";
import "../cart.css";
import { useNavigate } from "react-router-dom";


export default function Cart() {
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
        <button onClick={() => navigate("/payment")}>Checkout</button>
      </div>
    </aside>
  );
}
