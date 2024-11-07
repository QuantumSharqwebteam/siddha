import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OnlineStore from '../../pages/OnlineStore'; // Adjust the path based on your directory structure
import axiosInstance from '../../utilities/axiosInstance';
import { vi } from 'vitest'; // Import vi from vitest
import '@testing-library/jest-dom'; // for the matchers

// Mock axiosInstance
vi.mock('../../utilities/axiosInstance');

const mockProductData = [
  {
    productId: "1",
    productName: "Herbal Tea",
    category: "Tea",
    price: 250,
    discount: 10,
    imageUrl: "herbal-tea-image.jpg",
    overAllRating: 4.5,
  },
  {
    productId: "2",
    productName: "Herbal Oil",
    category: "Oil",
    price: 300,
    discount: 15,
    imageUrl: "herbal-oil-image.jpg",
    overAllRating: 4.0,
  },
];

const mockWishlistData = [
  { productId: "1" }, // Product in wishlist
];

describe("OnlineStore Component", () => {
  beforeEach(() => {
    // Mock the axios get request and response data for products
    axiosInstance.get.mockImplementation((url) => {
      if (url === 'product/getProducts') {
        return Promise.resolve({
          data: {
            message: mockProductData
          }
        });
      }
      if (url === 'user/getWishlist') {
        return Promise.resolve({
          data: {
            message: mockWishlistData
          }
        });
      }
    });
    // Clear the localStorage before each test
    localStorage.clear();
  });

  it("renders the OnlineStore component without crashing", async () => {
    render(
      <MemoryRouter>
        <OnlineStore />
      </MemoryRouter>
    );

    // Check that the title "Herbal Products" is rendered
    expect(screen.getByText("Herbal Products")).toBeInTheDocument();

    // Wait for the product data to be loaded and rendered
    await waitFor(() => {
      expect(screen.getByText(/Herbal Tea/i)).toBeInTheDocument();
      expect(screen.getByText(/₹250/i)).toBeInTheDocument();
    });

    // Check if the first product discount is correctly rendered
    expect(screen.getByText(/10% OFF/i)).toBeInTheDocument();
  });

  it("renders the wishlist functionality correctly", async () => {
    render(
      <MemoryRouter>
        <OnlineStore />
      </MemoryRouter>
    );

    // Wait for wishlist data to be loaded
    await waitFor(() => {
      // Check if the heart icon for a product in the wishlist is rendered as filled
      expect(screen.getByTestId("wishlist-filled-1")).toBeInTheDocument();

      // Check if the heart icon for a product not in the wishlist is rendered as outlined
      expect(screen.getByTestId("wishlist-outlined-2")).toBeInTheDocument();
    });
  });

  it("adds product to cart", async () => {
    render(
      <MemoryRouter>
        <OnlineStore />
      </MemoryRouter>
    );
  
    // Wait for product data to be loaded
    await waitFor(() => {
      // Check if the "Add to Cart" button is rendered for the first product
      const addToCartButton = screen.getByTestId("add-to-cart-1");
      expect(addToCartButton).toBeInTheDocument();
    });
  
    // Mock the behavior of adding a product to the cart (localStorage interaction)
    const addToCartButton = screen.getByTestId("add-to-cart-1"); // Use the unique test ID
    addToCartButton.click();
  
    // Check if the product was added to the cart
    const cart = JSON.parse(localStorage.getItem('cart'));
    expect(cart).toContain("1");
  });
  
});
