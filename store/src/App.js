import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useActionData,
} from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ShopContextProvider } from "./context/shop-context";



function App() {

  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  return (
    <div>
      <ShopContextProvider>
        <PayPalScriptProvider
          options={{
            "client-id": ""
          }}>
          <Router>
            <Header paymentSucceeded={paymentSucceeded} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/payment" element={<Payment setPaymentSucceeded={setPaymentSucceeded} />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Router>
        </PayPalScriptProvider>
      </ShopContextProvider>
    </div>
  );
}

export default App;
