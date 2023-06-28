import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Register from '../src/views/Register';

jest.mock('../src/assets/social_project.jpg', () => 'social_project.jpg');
jest.mock('../src/assets/logo_green.png', () => 'logo_green.png');
describe('Register component', () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
});
  test('should submit the form with valid data', async () => {
    
  
    render(<Register />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('RUT'), { target: { value: '12345678-9' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText('Crear'));

    // Wait for the asynchronous code to execute
    await waitFor(() => {
      expect(window.location.href).toBe('http://localhost/');
    });
  });

  test('should display an error message for invalid form submission', async () => {
    render(<Register />);

    // Fill in the form fields with invalid data
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('RUT'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), { target: { value: 'password456' } });

    fireEvent.click(screen.getByText('Crear'));

    // Wait for the asynchronous code to execute
    await waitFor(() => {
      expect(screen.getByText('Error: revise los campos ingresados.')).toBeInTheDocument();
    });
  });
});
