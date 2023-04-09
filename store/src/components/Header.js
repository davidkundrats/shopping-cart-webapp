import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="row block center">
      <div>
        <Link to="/">
          <h1>prints</h1>
        </Link>
      </div>
      <div>
        <Link to="/checkout">Checkout </Link>
      </div>
    </header>
  );
}
