import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";

export default function Product(props) {
  const { addToCart } = useContext(ShopContext);
  const { product } = props;
  return (
    <div>
      <a href={product.image}>
        <img className="small" src={product.image} alt={product.name}></img>
      </a>
      <h3>{product.name}</h3>
      <h4>${product.price}</h4>
      <div>
        <button onClick={() => addToCart(product.id)}> Add to cart </button>
      </div>
    </div>
  );
}
