import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useActionData,
} from "react-router-dom";
import Cart from "./pages/Cart";
import { ShopContextProvider } from "./context/shop-context";
import Header from "./components/Header";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div>
      <ShopContextProvider>
        <PayPalScriptProvider
          options={{
            "client-id":
              "AegV-HsTK6AStW72By7YtDrGSad88eC8P_JxYr-NO-nu3bAcByfyi1xDFPvwiOkqYxRV03zkeLUPzWmr",
          }}
        >
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Router>
        </PayPalScriptProvider>
      </ShopContextProvider>
    </div>
  );
}

export default App;
