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
    
    const { getByLabelText, getByText } = render(<FormProject />);

    fireEvent.change(getByLabelText('Nombre del proyecto'), { target: { value: 'Test Project' } });
    fireEvent.change(getByLabelText('Cuenta bancaria'), { target: { value: '1234567890' } });
    fireEvent.change(getByLabelText('Descripción del proyecto'), { target: { value: 'This is a test project' } });
    fireEvent.change(getByLabelText('Monto meta'), { target: { value: '1000' } });
    fireEvent.change(getByLabelText('Tipo de proyecto'), { target: { value: 'ONG' } });
    fireEvent.change(getByLabelText('Categoría'), { target: { value: 'EDUCATION' } });
    fireEvent.change(getByLabelText('Locación'), { target: { value: 'Test Location' } });
    fireEvent.change(getByLabelText('Fecha de término'), { target: { value: '2022-01-01' } });
    fireEvent.change(getByLabelText('Monto mínimo de donación'), { target: { value: '500' } });

    fireEvent.click(getByText('Enviar proyecto'));
    await waitFor(() => {
        expect(window.location.href).toBe('http://localhost/');
      });
  

  });

//   it('displays error messages if required fields are not filled', async () => {
//     const { getByText, getByLabelText } = render(<FormProject />);

//     fireEvent.click(getByText('Enviar proyecto'));

//     await waitFor(() => expect(getByLabelText('Nombre del proyecto')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Cuenta bancaria')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Descripción del proyecto')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Monto meta')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Tipo de proyecto')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Categoría')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Locación')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Fecha de término')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Monto mínimo de donación')).toHaveClass('ant-form-item-has-error'));
//   });
});