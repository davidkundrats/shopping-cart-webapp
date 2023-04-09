import React, { useContext, useState } from "react";
import { ShopContext } from "../context/shop-context";
import allProducts from "../data/fulldata";
import "../cart.css";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";


export default function Payment(props) {
    const { cartItems, getTotalCartAmount, } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();
    const [succeeded, setSucceeded] = useState(false);
    const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const [billingDetails, setBillingDetails] = useState("");

    // creates a paypal order

    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: totalAmount,
                        },
                    },
                ],
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // handles when a payment is confirmed for paypal
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setBillingDetails(payer);
            setSucceeded(true);
        });
    };

    // handles payment errors
    const onError = (data, actions) => {
        setPaypalErrorMessage("Something went wrong with your payment");
    };

    return (
        <aside className="cart">
            <div>
                <h1>Order Summary</h1>
            </div>
            <div>
                {allProducts.map((product) => {
                    if (cartItems[product.id] !== 0) {
                        return (
                            <div key={product.id}>
                                <img className="small" src={product.image} alt={product.name} />
                                <p>
                                    <b>{product.name}</b>
                                </p>
                                <p> ${product.price}</p>
                                <p> Quantity: {cartItems[product.id]}</p>
                            </div>
                        );
                    }
                })}
            </div>
            <div className="checkout">
                <p>Subtotal: ${totalAmount}</p>
                <button onClick={() => navigate("/")}>Continue Shopping</button>
                <PayPalButtons
                    style={{
                        color: "blue",
                        shape: "pill",
                        label: "pay",
                        tagline: false,
                        layout: "horizontal",
                    }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            </div>
        </aside>
    );
}
