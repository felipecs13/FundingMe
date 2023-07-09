import { render, fireEvent, waitFor } from '@testing-library/react';
import FormProject from '../src/views/NewProject';
import React from 'react';
import moment from 'moment';


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
    beforeEach(() => {
      // Mock the user state
      jest.spyOn(React, 'useState').mockReturnValue([
        { token: 'mockToken', id: 1, email: 'test@example.com', rut: '123456789', name: 'John Doe', is_admin: false },
        jest.fn(), // Mock setter function
      ]);

  // Set the locale within the moment instance
  moment.updateLocale('en', {});

  // Set the mock current date and time
  const now = new Date('2022-01-01T00:00:00.000Z');
  jest.spyOn(Date, 'now').mockImplementation(() => now.getTime());
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
    fireEvent.change(getByLabelText('Fecha de término'), { target: { value: '12-12-2024' } });
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