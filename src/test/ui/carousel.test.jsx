import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import BannerCarousel from '../../ui/BannerCarousel';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the axiosInstance
vi.mock('../../utilities/axiosInstance', () => ({
  default: {
      get: vi.fn().mockResolvedValue({
          data: {
              message: [
                  { productId: '1', productName: 'Product 1', description: 'Description 1', imageUrl: 'image1.jpg' },
                  { productId: '2', productName: 'Product 2', description: 'Description 2', imageUrl: 'image2.jpg' },
                  { productId: '3', productName: 'Product 3', description: 'Description 3', imageUrl: 'image3.jpg' },
                  { productId: '4', productName: 'Product 4', description: 'Description 4', imageUrl: 'image4.jpg' },
                  { productId: '5', productName: 'Product 5', description: 'Description 5', imageUrl: 'image5.jpg' },
              ],
          },
      }),
  },
}));


// Mock the react-icons
vi.mock('react-icons/io', () => ({
  IoIosArrowBack: () => <div data-testid="arrow-back" />,
  IoIosArrowForward: () => <div data-testid="arrow-forward" />,
}));

describe('BannerCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  const renderComponent = () => {
    render(
      <Router>
        <BannerCarousel />
      </Router>
    );
  };

  it('renders without crashing', async () => {
    await act(async () => {
      renderComponent();
    });
    expect(screen.getByText('Product 1')).toBeInTheDocument();
  });

  it('displays the correct number of products', async () => {
    await act(async () => {
      renderComponent();
    });
    expect(screen.getAllByRole('img')).toHaveLength(5); // Check if 5 images are displayed
  });

  it('changes slide when next button is clicked', async () => {
    await act(async () => {
      renderComponent();
    });
    
    const nextButton = screen.getByTestId('arrow-forward');
    fireEvent.click(nextButton);
    
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('changes slide when prev button is clicked', async () => {
    await act(async () => {
      renderComponent();
    });

    const prevButton = screen.getByTestId('arrow-back');
    fireEvent.click(prevButton);
    
    expect(screen.getByText('Product 5')).toBeInTheDocument();
  });

  it('auto-changes slides after 3 seconds', async () => {
    await act(async () => {
      renderComponent();
    });
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

});
