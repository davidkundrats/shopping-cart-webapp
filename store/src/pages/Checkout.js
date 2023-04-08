import React from 'react';
import ShippingForm from '../components/ShippingForm';
import Cart from './Cart';
import "../shipping.css"


function Checkout() {
    return (
        <div className="row">
            <div className="col-1">
                <div className="block">
                    <ShippingForm />
                </div>
            </div>
            <div className="col-2">
                <div className="block cart">
                    <Cart inCheckout={true} />
                </div>
            </div>
        </div>
    );
}


export default Checkout;



