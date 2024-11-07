import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import { vi } from 'vitest';
import WishList from '../../pages/WishList'; 
import axiosInstance from '../../utilities/axiosInstance';

vi.mock('../../utilities/axiosInstance', () => ({
    __esModule: true, // This is important for default exports
    default: {
        get: vi.fn(),
        put: vi.fn(),
    },
}));

describe('WishList Component', () => {
    beforeEach(() => {
        localStorage.setItem('token', 'test-token');
    });

    afterEach(() => {
        localStorage.removeItem('token');
        vi.clearAllMocks();
    });

    const renderWithRouter = (ui) => {
        return render(<MemoryRouter>{ui}</MemoryRouter>);
    };

    

    test('renders wishlist products when available', async () => {
        const mockProducts = [
            {
                productId: '1',
                productName: 'Test Product 1',
                price: 100,
                category: 'Category 1',
                discount: 10,
                imageUrl: 'http://example.com/image1.jpg',
                overAllRating: 4,
            },
            {
                productId: '2',
                productName: 'Test Product 2',
                price: 200,
                category: 'Category 2',
                discount: 20,
                imageUrl: 'http://example.com/image2.jpg',
                overAllRating: 5,
            },
        ];

        axiosInstance.get.mockResolvedValueOnce({ data: { message: mockProducts } });

        renderWithRouter(<WishList />);

        await waitFor(() => {
            expect(screen.getByText('Wishlist Products')).toBeInTheDocument();
        });

        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    test('removes a product from the wishlist', async () => {
        const mockProducts = [{ productId: '1', name: 'Test Product 1' }];
    
        axiosInstance.get.mockResolvedValueOnce({ data: { message: mockProducts } });
        axiosInstance.put.mockResolvedValueOnce({ data: { message: 'Removed successfully' } });
    
        renderWithRouter(<WishList />);
    
        // Wait for the product to be rendered
        await waitFor(() => {
            expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        });
    
        const removeButton = screen.getByLabelText(/remove from wishlist/i);
        fireEvent.click(removeButton);
    
        // Wait for the product to be removed
        await waitFor(() => {
            expect(screen.queryByText('Test Product 1')).not.toBeInTheDocument();
        });
    });
    
    

    test('displays message when no products in wishlist', async () => {
        axiosInstance.get.mockResolvedValueOnce({ data: { message: [] } });
    
        renderWithRouter(<WishList />);
    
        // Ensure axiosInstance.get is called
        expect(axiosInstance.get).toHaveBeenCalled();
    
        await waitFor(() => {
            expect(screen.getByText('You have no products on your wishlist!')).toBeInTheDocument();
        });
    });
});
