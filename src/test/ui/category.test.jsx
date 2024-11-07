import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import CategoryCarousel from '../../ui/CategoryCarousel'; // Adjust the import path as necessary

// Mock the image imports
vi.mock('../../assets/container1.jpeg', () => ({ default: 'mock-image-1' }));
vi.mock('../../assets/container2.jpeg', () => ({ default: 'mock-image-2' }));
vi.mock('../../assets/container3.jpeg', () => ({ default: 'mock-image-3' }));
vi.mock('../../assets/container4.jpeg', () => ({ default: 'mock-image-4' }));
vi.mock('../../assets/container5.jpeg', () => ({ default: 'mock-image-5' }));
vi.mock('../../assets/container6.jpeg', () => ({ default: 'mock-image-6' }));
vi.mock('../../assets/container7.jpeg', () => ({ default: 'mock-image-7' }));
vi.mock('../../assets/container8.jpeg', () => ({ default: 'mock-image-8' }));
vi.mock('../../assets/container9.jpeg', () => ({ default: 'mock-image-9' }));
vi.mock('../../assets/container10.jpeg', () => ({ default: 'mock-image-10' }));
vi.mock('../../assets/container11.jpeg', () => ({ default: 'mock-image-11' }));

describe('CategoryCarousel', () => {
  let scrollRef;

  beforeEach(() => {
    scrollRef = {
      current: {
        scrollBy: vi.fn(),
      },
    };

    // Mock the useRef to return the scrollRef mock
    vi.spyOn(React, 'useRef').mockReturnValue(scrollRef);
    
    render(<CategoryCarousel />);
  });

  it('renders without crashing', () => {
    expect(screen.getByText(/We offer a comprehensive coverage of more than 80+/i)).toBeInTheDocument();
  });

  it('renders the correct number of category items', () => {
    const categoryItems = screen.getAllByRole('img');
    expect(categoryItems).toHaveLength(11); // Adjust based on the number of items
  });

  it('displays category titles correctly', () => {
    expect(screen.getByText('Liver Problems')).toBeInTheDocument();
    expect(screen.getByText('Jaundice')).toBeInTheDocument();
    expect(screen.getByText('Diabetic')).toBeInTheDocument();
    expect(screen.getByText('Cancer')).toBeInTheDocument();
    expect(screen.getByText('Infertility')).toBeInTheDocument();
  });

  it('scrolls left when the left button is clicked', () => {
    const leftButton = screen.getByRole('button', { name: /scroll left/i });
    fireEvent.click(leftButton);
    expect(scrollRef.current.scrollBy).toHaveBeenCalledWith({ top: 0, left: -300, behavior: 'smooth' });
  });

  it('scrolls right when the right button is clicked', () => {
  const rightButton = screen.getByLabelText(/scroll right/i); // Use getByLabelText for aria-label
  fireEvent.click(rightButton);
  expect(scrollRef.current.scrollBy).toHaveBeenCalledWith({ top: 0, left: 300, behavior: 'smooth' });
});
});
