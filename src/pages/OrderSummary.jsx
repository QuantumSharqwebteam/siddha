import React, { useState } from 'react';

function OrderSummary({ cartItems }) {
    const [orderMethod, setOrderMethod] = useState('regular'); // Default order method

    // Calculate the total price
    const calculateTotalPrice = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    // Order summary values
    const price = calculateTotalPrice();
    const discount = 0; // You can calculate discount if needed
    const shipping = 'Rapido';
    const total = price - discount;

    return (
        <div className="order-summary mt-8 p-5 border-t">
            <h2 className="font-bold text-lg">Order Summary</h2>
            <p className="mt-2">Price: ₹{price}</p>
            <p className="mt-2">Discount: ₹{discount}</p>
            <p className="mt-2">Shipping: {shipping}</p>
            <p className="mt-2">Total: ₹{total}</p>

            {/* Choose Order Method */}
            <div className="order-method mt-4">
                <label className="mr-4">
                    <input
                        type="radio"
                        name="orderMethod"
                        value="regular"
                        checked={orderMethod === 'regular'}
                        onChange={() => setOrderMethod('regular')}
                    />
                    Regular
                </label>
                <label>
                    <input
                        type="radio"
                        name="orderMethod"
                        value="subscription"
                        checked={orderMethod === 'subscription'}
                        onChange={() => setOrderMethod('subscription')}
                    />
                    Subscription
                </label>
            </div>

            {/* Proceed to Order Button */}
            <button
                className="mt-4 px-6 py-2 bg-green1 text-white rounded-md hover:bg-lightgreen transition-all duration-200"
                onClick={() => alert('Proceeding to order')}
            >
                Proceed to Order
            </button>
        </div>
    );
}

export default OrderSummary;
