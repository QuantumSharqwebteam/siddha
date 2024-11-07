import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter to wrap the component
import Home from '../../pages/Home';// Adjust the path based on your project

describe("Home Component", () => {

  // Test if the component renders without crashing
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText("Trusted by Over 10,000+ Patients for Holistic Siddha Care")).toBeInTheDocument();
  });

  // Test if the Roles & Contributions section renders
  it("renders siddha care", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText("Dedicated to Providing the Best Siddha Care")).toBeInTheDocument();
  });

  // Test if the Achievements section renders
  it("renders Doctor detail", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText("Dr. Veera Babu, B.S.M.S.")).toBeInTheDocument();
  });

  // Test if the Expertise section renders
  it("renders book appoinment section", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText("Book an Appointment for Exceptional Siddha Care")).toBeInTheDocument();
  });

  // Test if the Research and Innovation section renders
  it("renders contsct section", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText("GET IN TOUCH")).toBeInTheDocument();
  });
});
