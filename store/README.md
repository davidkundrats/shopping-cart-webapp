# README

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
    Run npm install to install the required dependencies.
    Run npm start to start the development server.
    Open your web browser and navigate to http://localhost:3000 to view the app.

## Dependencies

The app uses several dependencies including:

    React: A JavaScript library for building user interfaces.
    React Router: A library for routing in React apps.
    Axios: A promise-based HTTP client for the browser and Node.js.
    PayPal-react-js: A payment processing platform for online businesses.
