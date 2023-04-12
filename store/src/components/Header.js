import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/shop-context";

export default function Header(props) {
  const navigate = useNavigate();
  const { resetCart } = useContext(ShopContext);
  const { paymentSucceeded } = props;
  const location = useLocation();

  // Event handler for button clicks
  const handleButtonClick = () => {
    // Check if current location is payment page and payment is completed
    if (location.pathname === "/payment" && paymentSucceeded) {
      resetCart();
    }
  };


  return (
    <header className="row block center">
      <div>
        <Link to="/" onClick={handleButtonClick}>
          prints
        </Link>
      </div>
      <div>
        {/* Add event handler to call handleButtonClick() on button click */}
        <Link to="/checkout" onClick={handleButtonClick}>
          Checkout
        </Link>
      </div>
    </header>
  );
}

