import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter to wrap the component
import About from '../../pages/About'; // Adjust the path based on your project

describe("About Component", () => {

  // Test if the component renders without crashing
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getByText("Dr. Veera Babu, B.S.M.S.")).toBeInTheDocument();
  });

  // Test if the Roles & Contributions section renders
  it("renders Roles & Contributions section", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getByText("Roles & Contributions")).toBeInTheDocument();
  });

  // Test if the Achievements section renders
  it("renders Achievements section", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getByText("Achievements:")).toBeInTheDocument();
  });

  // Test if the Expertise section renders
  it("renders Expertise section", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getByText("Expertise")).toBeInTheDocument();
  });

  // Test if the Research and Innovation section renders
  it("renders Research and Innovation section", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getByText("Research and Innovation:")).toBeInTheDocument();
  });
});
