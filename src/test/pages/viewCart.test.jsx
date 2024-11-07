import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ViewCart from '../../pages/ViewCart';
import axiosInstance from '../../utilities/axiosInstance';

// Mock the modules
vi.mock('axios');
vi.mock('../../utilities/axiosInstance', () => ({
  default: {
    get: vi.fn(),
    put: vi.fn(),
  },
}));
vi.mock('react-star-ratings', () => ({
  default: () => <div data-testid="star-ratings">Star Ratings</div>,
}));
vi.mock('../../ui/Header', () => ({ default: () => <div>Header</div> }));
vi.mock('../../ui/Footer', () => ({ default: () => <div>Footer</div> }));

describe('ViewCart Component', () => {
    const mockProduct = {
      productId: '1',
      productName: 'Test Product',
      price: 100,
      overAllRating: 4.5,
      description: 'Test description',
      imageUrl: 'test-image.jpg',
    };
  
    beforeEach(async () => {
      // Clear all mocks before each test
      vi.clearAllMocks();
  
      // Mock localStorage
      const localStorageMock = {
        getItem: vi.fn(() => JSON.stringify([])),
        setItem: vi.fn(),
      };
      Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  
      // Mock API responses
      axios.get.mockResolvedValue({ data: { message: mockProduct } });
      const axiosInstance = (await import('../../utilities/axiosInstance')).default;
      axiosInstance.get.mockResolvedValue({ data: { message: [] } });
      axiosInstance.put.mockResolvedValue({ data: { message: 'Success' } });
    });
  
    it('renders product details correctly', async () => {
      render(
        <MemoryRouter initialEntries={['/product/1']}>
          <Routes>
            <Route path="/product/:productId" element={<ViewCart />} />
          </Routes>
        </MemoryRouter>
      );
  
      await waitFor(() => {
        expect(screen.getByText(mockProduct.productName)).toBeInTheDocument();
        expect(screen.getByText(`₹${mockProduct.price}`)).toBeInTheDocument();
        expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
      });
    });
  
    // it('handles quantity changes correctly', async () => {
    //     render(
    //       <MemoryRouter initialEntries={['/product/1']}>
    //         <Routes>
    //           <Route path="/product/:productId" element={<ViewCart />} />
    //         </Routes>
    //       </MemoryRouter>
    //     );
    
    //     await waitFor(async () => {
    //       // Find quantity adjustment buttons using aria-label or title
    //       const increaseButton = await screen.getByLabelText(/add/i)
    //       const decreaseButton = await screen.getByLabelText(/subtract/i)
    //       console.log(increaseButton, "------------------");
          
          
    //       // Find quantity display (adjust this based on your actual implementation)
    //       const quantityDisplay = await screen.findByText(/^[0-9]+$/);
    
    //       expect(increaseButton).toBeInTheDocument();
    //       expect(decreaseButton).toBeInTheDocument();
    //       expect(quantityDisplay).toBeInTheDocument();
    
    //       // Test increasing quantity
    //       fireEvent.click(increaseButton);
    //       await waitFor(() => {
    //         expect(quantityDisplay).toHaveTextContent('2');
    //       });
    
    //       // Test decreasing quantity
    //       fireEvent.click(decreaseButton);
    //       await waitFor(() => {
    //         expect(quantityDisplay).toHaveTextContent('1');
    //       });
    
    //       // Ensure quantity doesn't go below 1
    //       fireEvent.click(decreaseButton);
    //       await waitFor(() => {
    //         expect(quantityDisplay).toHaveTextContent('1');
    //       });
    //     });
    //   });
  
    it('adds product to cart', async () => {
        render(
          <MemoryRouter initialEntries={['/product/1']}>
            <Routes>
              <Route path="/product/:productId" element={<ViewCart />} />
            </Routes>
          </MemoryRouter>
        );
    
        await waitFor(async () => {
          // Find the button using a more flexible approach
          const addToCartButton = await screen.findByRole('button', { name: /add to cart/i });
          expect(addToCartButton).toBeInTheDocument();
    
          fireEvent.click(addToCartButton);
    
          expect(localStorage.setItem).toHaveBeenCalledWith('cart', expect.any(String));
          const setItemCall = localStorage.setItem.mock.calls[0];
          const parsedCart = JSON.parse(setItemCall[1]);
          expect(parsedCart).toEqual([{ productId: '1', quantity: 1 }]);
        });
      });
  
    it('toggles wishlist', async () => {
      const axiosInstance = (await import('../../utilities/axiosInstance')).default;
      axiosInstance.get.mockResolvedValue({ data: { message: [] } });
  
      render(
        <MemoryRouter initialEntries={['/product/1']}>
          <Routes>
            <Route path="/product/:productId" element={<ViewCart />} />
          </Routes>
        </MemoryRouter>
      );
  
      await waitFor(() => {
        const addToWishlistButton = screen.getByText('Add to Wishlist');
        fireEvent.click(addToWishlistButton);
  
        expect(axiosInstance.put).toHaveBeenCalledWith(
          'user/addToWishlist',
          { productId: '1' },
          expect.any(Object)
        );
      });
    });
  });