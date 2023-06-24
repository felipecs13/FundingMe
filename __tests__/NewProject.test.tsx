// import { render, fireEvent, waitFor } from '@testing-library/react';
// import FormProject from '../src/views/NewProject';

// describe('FormProject', () => {
//   it('renders without crashing', () => {
//     render(<FormProject />);
//   });

//   it('submits the form correctly', async () => {
//     const mockOnFinish = jest.fn();
//     const { getByLabelText, getByText } = render(<FormProject />);

//     fireEvent.change(getByLabelText('Nombre del proyecto'), { target: { value: 'Test Project' } });
//     fireEvent.change(getByLabelText('Cuenta bancaria'), { target: { value: '1234567890' } });
//     fireEvent.change(getByLabelText('Descripción del proyecto'), { target: { value: 'This is a test project' } });
//     fireEvent.change(getByLabelText('Monto meta del proyecto (CLP)'), { target: { value: '1000' } });
//     fireEvent.change(getByLabelText('Selecciona tipo de proyecto'), { target: { value: 'ONG' } });
//     fireEvent.change(getByLabelText('Selecciona categoría'), { target: { value: 'EDUCATION' } });
//     fireEvent.change(getByLabelText('Locación del proyecto'), { target: { value: 'Test Location' } });
//     fireEvent.change(getByLabelText('Fecha de término'), { target: { value: '2022-01-01' } });
//     fireEvent.change(getByLabelText('Monto mínimo de donación (CLP)'), { target: { value: '500' } });

//     fireEvent.click(getByText('Enviar proyecto'));

//     await waitFor(() => expect(mockOnFinish).toHaveBeenCalled());
//   });

//   it('displays error messages if required fields are not filled', async () => {
//     const { getByText, getByLabelText } = render(<FormProject />);

//     fireEvent.click(getByText('Enviar proyecto'));

//     await waitFor(() => expect(getByLabelText('Nombre del proyecto')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Cuenta bancaria')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Descripción del proyecto')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Monto meta del proyecto (CLP)')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Selecciona tipo de proyecto')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Selecciona categoría')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Locación del proyecto')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Fecha de término')).toHaveClass('ant-form-item-has-error'));
//     await waitFor(() => expect(getByLabelText('Monto mínimo de donación (CLP)')).toHaveClass('ant-form-item-has-error'));
//   });
// });