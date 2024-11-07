// AddToCart.test.js
import React from 'react'; 
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddToCart from '../../pages/AddToCart'; // Adjust the path based on your directory structure
import axiosInstance from '../../utilities/axiosInstance';
import { vi } from 'vitest';
import '@testing-library/jest-dom'; // for the matchers

// Mock axiosInstance
vi.mock('../../utilities/axiosInstance');

const mockProductData = {
    message: {
        id: "1",
        productName: "Herbal Tea",
        price: 250,
        quantity: 2,
        imageUrl: 'http://example.com/image.jpg', // Mock image URL
        category: 'Beverages',
        overAllRating: 4.5,
        qty: 2, // Quantity in cart
    },
};

describe("AddToCart Component", () => {
    beforeEach(() => {
        // Mock the axios get request and response data
        axiosInstance.get.mockImplementation((url) => {
            if (url === 'product/getOne/1') {
                return Promise.resolve(mockProductData);
            }
            return Promise.reject(new Error('Product not found'));
        });

        // Set up localStorage with mock cart data
        const mockCartData = [{ productId: "1", qty: 2 }];
        localStorage.setItem('cart', JSON.stringify(mockCartData));
    });

    it("fetches products by IDs and displays them", async () => {
        render(
            <MemoryRouter>
                <AddToCart cartProducts={[mockProductData.message]} updateQuantity={vi.fn()} removeFromCart={vi.fn()} />
            </MemoryRouter>
        );

        // Wait for product data to be loaded
        await waitFor(() => {
            // Check for product name text
            expect(screen.getByText(/Herbal Tea/i)).toBeInTheDocument(); // Use regex for flexibility

            // Check for price text using data-testid
            expect(screen.getByTestId('product-price-1')).toHaveTextContent('₹ 250'); // Updated to use productId

            // Check for quantity text
            expect(screen.getByText(/2/i)).toBeInTheDocument();
        });
    });

    it("handles errors correctly", async () => {
        // Set up localStorage with an invalid product ID
        const invalidCartData = [{ productId: "999", qty: 1 }];
        localStorage.setItem('cart', JSON.stringify(invalidCartData));

        render(
            <MemoryRouter>
                <AddToCart cartProducts={[]} updateQuantity={vi.fn()} removeFromCart={vi.fn()} />
            </MemoryRouter>
        );

        // Wait for a bit to allow the error to be caught
        await waitFor(() => {
            expect(screen.queryByText(/Herbal Tea/i)).not.toBeInTheDocument(); // Product should not be rendered
        });
    });
});
