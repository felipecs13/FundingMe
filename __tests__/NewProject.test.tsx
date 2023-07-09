import { render, fireEvent, waitFor } from '@testing-library/react';
import FormProject from '../src/views/NewProject';

jest.mock('../src/assets/logo_green.png', () => 'logo_green.png');
jest.mock('../src/assets/social_project.jpg', () => 'social_project.jpg');
describe('FormProject', () => {

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

    
  it('renders without crashing', () => {
    render(<FormProject />);
  });
  
  it('submits the form correctly', async () => {

    const { getByLabelText, getByText, getByPlaceholderText } = render(<FormProject />);

    fireEvent.change(getByLabelText('Nombre del proyecto'), { target: { value: 'Test Project' } });
    fireEvent.change(getByLabelText('Cuenta bancaria'), { target: { value: '1234567890' } });
    fireEvent.change(getByLabelText('Descripción del proyecto'), { target: { value: 'This is a test project' } });
    fireEvent.change(getByLabelText('Monto meta'), { target: { value: '1000' } });
    fireEvent.change(getByLabelText('Tipo de proyecto'), { target: { value: 'ONG' } });
    fireEvent.change(getByLabelText('Categoría'), { target: { value: 'EDUCATION' } });
    fireEvent.change(getByLabelText('Locación'), { target: { value: 'Test Location' } });
    fireEvent.change(getByPlaceholderText('dd-mm-yyyy'), { target: { value: '2022-12-12' } });
    fireEvent.change(getByLabelText('Monto mínimo de donación'), { target: { value: '500' } });

    fireEvent.click(getByText('Enviar proyecto'));
    await waitFor(() => {
        expect(window.location.href).toBe('http://localhost/');
      });
  

  });

});