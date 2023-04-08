import React from "react";
import Product from "./Product";

export default function Top(props) {
  const { productsTop } = props;

  return (
    <main className="block col-2">
      <h2>Prints</h2>
      <div className="row">
        {productsTop.map((product) => (
          <Product key={product.id} product={product}></Product>
        ))}
      </div>
    </main>
  );
}
