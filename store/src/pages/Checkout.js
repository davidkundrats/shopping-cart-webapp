import React from 'react';
import Cart from '../components/Cart';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const navigate = useNavigate();
    return (
        <div >
            <div>
                <Cart />
            </div>
        </div>
    );
}


export default Checkout;



