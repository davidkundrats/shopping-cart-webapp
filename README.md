# shopping-cart-webapp
a MERN stack website that allows users to purchase darkroom prints from myself. 

# README

# Client side code

This client-side code consists of 3 pages: '/', '/checkout', and '/payment'. The code is written in React and uses several features including useState, useContext, and a context provider page to manage state across the app.
## **Pages**
### Home Page (Route: '/')

The home page displays a list of products available for purchase. Users can add or remove items from their cart, and see the total cost of their items. The items displayed on this page are rendered dynamically using a component that accepts an array of product data.
### Checkout Page (Route: '/checkout')

The checkout page displays a summary of the user's shopping cart. Users can adjust the quantity of each item, remove items, and see the updated total cost of their items. The items displayed on this page are also rendered dynamically using a component that accepts the user's shopping cart data.
### Payment Page (Route: '/payment')

The payment page allows users to enter their payment information to complete their purchase. This page also displays a summary of the user's shopping cart and the total cost of their items. Users can enter their payment details securely as the payment portal is managed by PayPal, allowing users to have a familiar, easy checkout experienece. 
### State Management

The app uses useState to manage state across the app. The state is passed down to child components as props.
### Context Provider Page

A context provider page is used to manage state across the app. The context provider page contains the state and functions to update the state. This page wraps the entire app in a ShopContextProvider component.
### useContext

The useContext hook is used to access the state and functions in the context provider page. This allows child components to update the state and trigger re-renders as needed.
Components

The app contains 10+ components that are used to render dynamic values and allow adjustment of the shopping cart. These components are reusable and can be used throughout the app.
## How to Run the Code

To run the client-side code, follow these steps:

    Clone the repository to your local machine.
    Navigate to the root directory of the project.
    Run the following command to install the required dependencies: 

```bash 
npm install  
``` 
    Run the following command to start the development server:
```bash 
npm start
```
    Open your web browser and navigate to http://localhost:3000 to view the app.
    
    For a build to be pushed onto an EC2 instance, use the following command and then clone the static files onto the instance:
```bash 
npm run build
```

## Dependencies

The app uses several dependencies including:
* `React`: A JavaScript library for building user interfaces.
* `React Router`: A library for routing in React apps.
* `Axios`: A promise-based HTTP client for the browser and Node.js.
* `PayPal-react-js`: A payment processing platform for online businesses.

# Server side code

This is a server-side JavaScript code written using Node.js and Express.js framework.

## Functionalities

* Loads environment variables from `.env` file using `dotenv` package
* Creates an instance of Express app and enables Cross-Origin Resource Sharing (CORS)
* Serves static files from the `build` directory using `express.static` middleware
* Implements a fallback route to serve the `index.html` file for any undefined routes
* Creates a Nodemailer transporter to send emails using the email service specified in environment variables
* Connects to MongoDB using Mongoose and logs a message upon successful connection
* Defines a schema and model for the shipping data and provides a POST endpoint to save shipping data to MongoDB
* Provides a POST endpoint to send an email confirmation to the customer
* Starts the server and listens for incoming requests on a specified port


### Dependencies

The following packages are required to run this code:

* `dotenv`: Loads environment variables from `.env` file
* `express`: Web framework for Node.js
* `mongoose`: Object Data Modeling (ODM) library for MongoDB
* `cors`: Cross-Origin Resource Sharing middleware for Express.js
* `xss`: Sanitizes user input to prevent cross-site scripting (XSS) attacks
* `nodemailer`: Sends emails from Node.js
* `path`: Provides utilities for working with file and directory paths


### Installation

Before running the code, ensure that Node.js and MongoDB are installed on the machine (Or, alternatively, add MongoDB Atlas credentials to an .env file). Then, install the required dependencies using the following command:

```bash
npm install
```

### Usage

To start the server, run the following command:

```bash
npm start
```

The server will start listening for incoming requests on the port specified in environment variables or port `4500` if not specified. Access the server at `http://localhost:<port>/`.

### For use within the EC2 instance, there will need to be a server configured to act as a reverse proxy to forward the API requests to port 4500.

### Here is an example of an NGINX configuration that I used: 
![nginx screesnhot](https://user-images.githubusercontent.com/98171693/234328530-771ac617-c0d2-4381-b75a-922f6814ccd8.jpg)
 * Please note that you will need to download and install Certbot to gain your own certifications on the server side.
 
 # AWS Services
