import React from "react";
import Product from "./Product";

export default function Middle(props) {
  const { productsMid } = props;

  return (
    <main className="block col-2">
      <div className="row">
        {productsMid.map((product) => (
          <Product key={product.id} product={product}></Product>
        ))}
      </div>
    </main>
  );
}
