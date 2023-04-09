import React, { useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/shop-context";
import "../shipping.css";
import { useNavigate } from "react-router-dom";

export default function ShippingForm() {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        town: "",
        state: "",
        zip: "",
    });
    const navigate = useNavigate();

    const { cartItems } = useContext(ShopContext); // Access cartItems and setShippingInfo from context

    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Update cartItems format
        const cartItemsWithData = Object.keys(cartItems).map((itemId) => {
            return {
                id: itemId,
                quantity: cartItems[itemId],
            };
        });

        const errors = validateForm(formData);
        if (Object.keys(errors).length === 0) {
            // Include cartItems and shipping info in form submission
            try {
                await axios.post("http://localhost:5000/api/shipping", {
                    ...formData,
                    cartItems: cartItemsWithData,
                });
            } catch (error) {
                console.error("Error sending data to MongoDB:", error);
            }
        } else {
            setFormErrors(errors);
        }
    };
    const validateForm = (data) => {
        const errors = {};
        if (!data.name) {
            errors.name = 'Please enter your name';
        }
        if (!data.address) {
            errors.address = 'Please enter your street address';
        }
        if (!data.town) {
            errors.town = 'Please enter your town';
        }
        if (!data.state) {
            errors.state = 'Please enter your state';
        }
        if (!data.zip) {
            errors.zip = 'Please enter your zip code';
        } else if (!/^[0-9]{5}(?:-[0-9]{4})?$/.test(data.zip)) {
            errors.zip = 'Please enter a valid zip code';
        }
        return errors;
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h1>  Shipping Info: </h1>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                {formErrors.name && <span>{formErrors.name}</span>}
            </div>
            <div>
                <label htmlFor="address">Street Address:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                />
                {formErrors.address && <span>{formErrors.address}</span>}
            </div>
            <div>
                <label htmlFor="town">Town:</label>
                <input
                    type="text"
                    name="town"
                    value={formData.town}
                    onChange={handleInputChange}
                />
                {formErrors.town && <span>{formErrors.town}</span>}
            </div>
            <div>
                <label htmlFor="state">State:</label>
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                />
                {formErrors.state && <span>{formErrors.state}</span>}
            </div>
            <div>
                <label htmlFor="zip">Zip Code:</label>
                <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                />
                {formErrors.zip && <span>{formErrors.zip}</span>}
            </div>
            <button type="submit" onClick={() => navigate("/payment")}>Submit and Proceed to Payment</button>
        </form>
    );
};