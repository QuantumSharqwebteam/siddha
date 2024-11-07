import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Header from '../../ui/Header'; // Adjust the path as necessary
import { vi } from 'vitest';

// Mock the entire react-router-dom module
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useNavigate: vi.fn(),
    };
  });
  
  describe('Header Component', () => {
    const mockNavigate = vi.fn();
  
    beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
  
      // Set the mock return value for useNavigate
      vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  
      // Render the Header component with MemoryRouter for routing
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
    });

  it('renders the logo', () => {
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('displays contact information', () => {
    expect(screen.getByText(/90919 Madie run Apt. 790/i)).toBeInTheDocument();
    expect(screen.getByText(/medico@health.care/i)).toBeInTheDocument();
    expect(screen.getByText(/\+91 1111111111/i)).toBeInTheDocument();
  });

  it('toggles the contacts dropdown', async () => {
    const phoneIcon = screen.getByLabelText(/phone/i);
    fireEvent.click(phoneIcon);
    
    // Wait for the dropdown content to be visible
    await waitFor(() => {
      expect(screen.getByText(/90919 Madie run Apt. 790/i)).toBeVisible();
    });

    fireEvent.click(phoneIcon);
    
    // Wait for the dropdown to close
    await waitFor(() => {
      expect(screen.queryByText(/90919 Madie run Apt. 790/i)).not.toBeVisible();
    });
  });

  it('renders the logo', () => {
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });

  it('navigates to the login page when login is clicked', async () => {
    // Ensure the login link is present
    const loginLink = screen.getByText(/login/i);
    expect(loginLink).toBeInTheDocument();
    
    fireEvent.click(loginLink);
    
    // Check if navigate was called with the expected argument
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('shows the profile dropdown when the profile icon is clicked', () => {
    const profileIcon = screen.getByLabelText(/profile/i);
    fireEvent.click(profileIcon);
    
    expect(screen.getByText(/Reset Password/i)).toBeVisible();
    expect(screen.getByText(/Orders/i)).toBeVisible();
  });

  it('logs out and redirects to login', () => {
    // Set a token in localStorage to simulate a logged-in user
    localStorage.setItem('token', 'test-token');

    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);
    
    // Check that localStorage token is removed
    expect(localStorage.getItem('token')).toBeNull();
    
    // Check that navigate was called with '/login'
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
