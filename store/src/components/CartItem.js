import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";

export default function CartItem(props) {
  const { name, price, image, id } = props.data;
  const { cartItems, addToCart, removeFromCart } = useContext(ShopContext);
  return (
    <div>
      <img className="small" src={image} alt={name} />
      <p>
        <b>{name}</b>
      </p>
      <p> ${price}</p>
      <div className="countHandler">
        <button onClick={() => removeFromCart(id)}>-</button>
        <b> {cartItems[id]} </b>
        <button onClick={() => addToCart(id)}>+</button>
      </div>
    </div>
  );
}
