require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const xss = require('xss');
const nodemailer = require('nodemailer');

const path = require('path');

const _dirname = path.dirname("")
const buildPath = path.join(_dirname, "../store/build")
const app = express(); // Create Express app instance

app.use(express.json());
app.use(express.static(buildPath))


app.get("/*", (req, res) => {
    res.sendFile(path.join(_dirname, "../store/build/index.html"), err => {
        if (err) {
            res.status(500).send(err)
        }
    })
})


const mailUserName = process.env.MAIL_USERNAME;
const mailPassword = process.env.MAIL_PASSWORD;
const serviceProvider = process.env.SERVICE_PROVIDER;
const mongoUser = process.env.MONGO_USERNAME;



const transporter = nodemailer.createTransport({
    service: serviceProvider, // use the email service of your choice
    auth: {
        user: mailUserName, // replace with your email address
        pass: mailPassword // replace with your email password
    }
});

const PORT = process.env.PORT || 4500;

// enable cors
app.use(cors());

// connect to MongoDB with username and password
mongoose.connect('mongodb://localhost:27017/orders', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// create a schema for the shipping data
const shippingSchema = new mongoose.Schema({
    orderId: String,
    items: [
        {
            id: String,
            quantity: Number,
        },
    ],
});


// create a model for the shipping data
const Shipping = mongoose.model('Shipping', shippingSchema);

app.use(express.json());

// handle POST request to /api/shipping
app.post('/api/shipping', async (req, res) => {
    const { orderId, items } = req.body;

    const shippingDoc = new Shipping({ orderId, items });

    // Save the shipping document to MongoDB
    await shippingDoc.save();

    // Send response
    res.status(201).json({
        message: 'Shipping information saved successfully',
        shipping: shippingDoc,
    });
});

app.post('/api/order', (req, res) => {
    const { email, orderId } = req.body; // assuming the email is submitted as part of the form data

    santitizedEmail = xss(email); // sanitize the email

    // Construct the email message
    const mailOptions = {
        from: mailUserName, // replace with your email address
        to: email, // the email address submitted by the user
        subject: 'Order Confirmation',
        text: `Thank you for your order. Your order has been confirmed. Here is your order confirmation number: ${orderId}.` // Fix: Use template literals
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});


app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

