import React, { useContext, useState } from "react";
import { ShopContext } from "../context/shop-context";
import allProducts from "../data/fulldata"; // import the allProducts array
import "../cart.css";
import "../orderconfirmation.css"
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

export default function Payment(props) {
    const { cartItems, getTotalCartAmount, } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();
    const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const [billingDetails, setBillingDetails] = useState("");
    const { setPaymentSucceeded } = props;
    const [succeeded, setSucceeded] = useState(false);

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
            const items = [];
            const { payer } = details;
            setBillingDetails(payer);
            setSucceeded(true);
            setPaymentSucceeded(true);

            const orderID = data.orderID;

            // Add name field to each product in allProducts array
            const productsWithNames = allProducts.map((product) => {
                const productCopy = { ...product };
                const matchingItem = items.find((item) => item.id === product.id);
                if (matchingItem) {
                    productCopy.name = matchingItem.name;
                }
                return productCopy;
            });

            allProducts.map((product) => {
                if (cartItems[product.id] !== 0) {
                    items.push({
                        id: product.id,
                        name: product.name, // Add name field for each item
                        quantity: cartItems[product.id],
                    });
                }
            });

            const orderData = {
                orderId: orderID,
                items: items,
            };

            axios
                .post("http://localhost:4500/api/shipping", orderData)
                .then((response) => {
                    console.log('status:201');
                })
                .catch((error) => {
                    console.log(error);
                    setPaypalErrorMessage("Something went wrong with your payment");
                });
        });

    };

    // handles payment errors
    const onError = (data, actions) => {
        setPaypalErrorMessage("Something went wrong with your payment");
    };


    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Call the function to post email to the server
        postEmailToServer(email, orderID);
    }

    const postEmailToServer = (email, orderID) => {
        // Construct the request body
        const data = {
            email: email,
            orderId: orderID // assuming the orderID is already available
        };

        // Make a POST request to the server
        fetch("http://localhost:4500/api/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                // Handle success
                console.log('status:201'); // assuming the server returns a 'message' field
            })
            .catch(error => {
                // Handle error
                console.error('Failed to send email:', error);
            });
    };

    if (succeeded) {
        return (
            <div className="order-confirmed">
                <h2>Order Confirmed</h2>
                <p>Order ID: <span>{orderID}</span></p>
                <div className="order-items">
                    <h3>Order Items:</h3>
                    {allProducts.map((product) => {
                        if (cartItems[product.id] !== 0) {
                            return (
                                <div className="order-item" key={product.id}>
                                    <img className="small" src={product.image} alt={product.name} />
                                    <div className="order-item-details">
                                        <p><b>{product.name}</b></p>
                                        <p> ${product.price}</p>
                                        <p> Quantity: {cartItems[product.id]}</p>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>

                {/* Add the form */}
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email for confirmation number" // Placeholder text
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>

            </div>
        );
    }
    else {
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
}