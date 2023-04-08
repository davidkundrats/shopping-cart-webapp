import React, { createContext, useState } from "react";
import allProducts from "../data/fulldata";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < 9 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCart] = useState(getDefaultCart());
  const [cartItemIds, setCartItemIds] = useState([]);

  const addToCart = (id) => {
    console.log("Added item with id:", id);
    setCart((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    setCartItemIds((prev) => [...prev, id]);
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allProducts.find((product) => product.id === item);
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const removeFromCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    setCartItemIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  const contextValue = {
    cartItems,
    cartItemIds,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getDefaultCart,
  };

  return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};
