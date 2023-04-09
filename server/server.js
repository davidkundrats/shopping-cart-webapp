require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const xss = require('xss');

const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables
// const USERNAME = process.env.MONGO_USERNAME;
// const PASSWORD = process.env.MONGO_PASSWORD;

// connect to MongoDB with username and password
mongoose.connect(`mongodb://0.0.0.0:27017/orders`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// create a schema for the shipping data
const shippingSchema = new mongoose.Schema({
    name: String,
    address: String,
    town: String,
    state: String,
    zip: String,
    orderId: String,
    cartItems: [{
        id: String,
        quantity: Number,
    }],
});


// create a model for the shipping data
const Shipping = mongoose.model('Shipping', shippingSchema);

// enable cors
app.use(cors());
app.use(express.json());

// handle POST request to /api/shipping
app.post('/api/shipping', async (req, res) => {
    try {
        // Extract data from request body and sanitize user input
        const {
            name,
            address,
            town,
            state,
            zip,
            cartItems
        } = req.body;
        const sanitized = {
            name: xss(name),
            address: xss(address),
            town: xss(town),
            state: xss(state),
            zip: xss(zip),
            cartItems: cartItems.map((item) => ({
                id: xss(item.id),
                quantity: xss(item.quantity)
            }))
        };

        // Use parameterized queries to prevent SQL injection
        const shipping = new Shipping(sanitized);

        // Save the shipping document to MongoDB
        await shipping.save();

        // Send response
        res.status(201).json({
            message: 'Shipping information saved successfully',
            shipping: shipping
        });
    } catch (error) {
        console.error('Error saving shipping information to MongoDB:', error);
        res.status(500).json({
            error: 'Failed to save shipping information'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
