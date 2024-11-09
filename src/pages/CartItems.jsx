import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CartItems({ onRemove }) {
    const [cartItems, setCartItems] = useState([]);

    // Fetch cart items from localStorage
    const getCartItems = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
    };

    // Remove item from cart
    const removeItem = (productId) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.productId !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        getCartItems(); // Update the state after removal
        toast.success('Item removed from cart');
        onRemove(); // Callback to handle removal
    };

    useEffect(() => {
        getCartItems();
    }, []);

    return (
        <div className="cart-items">
            <ToastContainer />
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.productId} className="cart-item flex justify-between items-center mt-4 p-4 border-b">
                        <div className="cart-item-details flex items-center gap-4">
                            <img src={item.imageUrl} alt={item.productName} className="w-20 h-20 object-cover" />
                            <div>
                                <p className="font-bold">{item.productName}</p>
                                <p>₹{item.price}</p>
                                <div className="ratings">
                                    {[...Array(item.rating)].map((_, index) => (
                                        <span key={index}>⭐</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="cart-item-quantity flex items-center gap-2">
                            <p>Quantity: {item.quantity}</p>
                            <button className="px-2 py-1 bg-red-500 text-white" onClick={() => removeItem(item.productId)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default CartItems;
