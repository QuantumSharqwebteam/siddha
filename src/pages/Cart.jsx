import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCartItems = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/cart');
            setCartItems(response.data.items);
        } catch (error) {
            setError('Error fetching cart items');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        const newItem = {
            name: 'New Product',
            quantity: 1,
            price: 19.99,
            imageUrl: 'https://example.com/image.jpg',
            category: 'Category Name',
            overAllRating: 4.5,
            discount: 10
        };

        try {
            await axios.post('http://localhost:5000/api/cart', newItem);
            fetchCartItems();
        } catch (error) {
            setError('Error adding item to cart');
        }
    };

    const handleRemoveFromCart = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5000/api/cart/${itemId}`);
            fetchCartItems();
        } catch (error) {
            setError('Error removing item from cart');
        }
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            await axios.put(`http://localhost:5000/api/cart/${itemId}`, { quantity: newQuantity });
            fetchCartItems();
        } catch (error) {
            setError('Error updating item quantity');
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const discountedPrice = item.price - (item.price * item.discount / 100);
            return total + discountedPrice * item.quantity;
        }, 0);
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            <button onClick={handleAddToCart}>Add Item to Cart</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item._id}>
                                <div>
                                    <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px' }} />
                                    <h2>{item.name}</h2>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: 
                                        <button onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
                                        {item.quantity}
                                        <button onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
                                    </p>
                                    <p>Category: {item.category}</p>
                                    <p>Rating: {item.overAllRating}</p>
                                    <p>Discount: {item.discount}%</p>
                                    <button onClick={() => handleRemoveFromCart(item._id)}>Remove from Cart</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${calculateTotal().toFixed(2)}</p>
                </>
            )}
        </div>
    );
};

export default Cart;
