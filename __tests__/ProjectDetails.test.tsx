import { render, fireEvent, waitFor, screen, prettyDOM } from '@testing-library/react';
import ProjectDetail from '../src/views/ProjectDetail';
import React from 'react';

jest.mock('../src/assets/social_project.jpg', () => 'social_project.jpg');
jest.mock('../src/assets/logo_green.png', () => 'logo_green.png');
jest.mock('react-credit-cards-2/dist/es/styles-compiled.css', () => 'styles-compiled.css');

describe('Project Detail component', () => {
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
  test('should display a modal after pressing Donar', async () => {

    const { container } = render(<ProjectDetail idProp='4' />);

    // Why content is not on the document?
    console.log(prettyDOM(container));

    // Press the button
    fireEvent.click(screen.getByText('Donar'));

    // Expect to find the modal
    await waitFor(() => {
      expect(screen.getByText('Enviar')).toBeInTheDocument();
    });

  });

});
