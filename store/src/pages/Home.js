import React from "react";
import Top from "../components/Top";
import dataTop from "../data/dataTop";
import dataMid from "../data/dataMid";
import dataBot from "../data/dataBot";
import FAQ from "../components/FAQ";
import Middle from "../components/Middle";
import Bottom from "../components/Bottom";
import About from "../components/About";



export default function Home() {
  const { productsTop } = dataTop;
  const { productsMid } = dataMid;
  const { productsBot } = dataBot;

  return (
    <div className="App">
      <div className="row">
        <FAQ></FAQ>
        <About />
      </div>
      <div>
        <Top productsTop={productsTop}></Top>
      </div>
      <div>
        <Middle productsMid={productsMid}></Middle>
      </div>
      <div>
        <Bottom productsBot={productsBot}></Bottom>
      </div>
    </div>
  );
}
