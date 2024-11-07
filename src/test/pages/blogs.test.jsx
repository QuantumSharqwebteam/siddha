import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Blogs from '../../pages/Blogs';
import axiosInstance from '../../utilities/axiosInstance';
import { vi } from 'vitest'; // Import vi from vitest
import '@testing-library/jest-dom'; // for the matchers

// Mock axiosInstance
vi.mock('../../utilities/axiosInstance');

const mockBlogData = [
  {
    title: "Understanding COVID-19",
    category: "CORONO",
    description: "An overview of the pandemic and its effects.",
    imageUrl: "corona-image-url.jpg",
    link: "/blogs/1"
  },
  {
    title: "Healthy Living",
    category: "Health",
    description: "Tips for a healthier lifestyle.",
    imageUrl: "healthy-living-image.jpg",
    link: "/blogs/2"
  },
  {
    title: "Fitness and You",
    category: "Fitness",
    description: "A guide to staying fit during the pandemic.",
    imageUrl: "fitness-image.jpg",
    link: "/blogs/3"
  }
];

describe("Blogs Component", () => {
  beforeEach(() => {
    // Mock the axios get request and response data
    axiosInstance.get.mockResolvedValue({
      data: {
        message: mockBlogData
      }
    });
  });

  it("renders the Blogs component without crashing", async () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );

    // Check that the page title "BLOG’S" is rendered
    expect(screen.getByText("BLOG’S")).toBeInTheDocument();

    // Wait for the blog data to be loaded and rendered
    await waitFor(() => {
      const titles = screen.getAllByText(/Understanding COVID-19/i);
      expect(titles.length).toBeGreaterThan(0); // Ensure at least one instance is present
    });

    // Check that the "Trending Topics" section is displayed
    expect(screen.getByText("Trending Topics:")).toBeInTheDocument();
  });

  it("renders the thumbnail section with the correct blog", async () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );

    // Wait for the thumbnail blog to be loaded and rendered
    await waitFor(() => {
      const titles = screen.getAllByText(/Understanding COVID-19/i);
      expect(titles.length).toBeGreaterThan(0); // Ensure at least one instance is present
    });

    // Check if the "Read More" link for the thumbnail is rendered
    const readMoreLink = screen.getByText("Read More");
    expect(readMoreLink).toBeInTheDocument();
    expect(readMoreLink).toHaveAttribute('href', '/blogs/1');
  });

  it("renders multiple trending topics", async () => {
    render(
      <MemoryRouter>
        <Blogs />
      </MemoryRouter>
    );

    // Wait for the trending topics to be loaded
    await waitFor(() => {
      expect(screen.getByText(/Healthy Living/i)).toBeInTheDocument();
      expect(screen.getByText(/Fitness and You/i)).toBeInTheDocument();
    });

    // Check if the first blog title and its description are correctly rendered
    expect(screen.getByText(/Healthy Living/i)).toBeInTheDocument();
    expect(screen.getByText(/Tips for a healthier lifestyle./i)).toBeInTheDocument();
  });
});
