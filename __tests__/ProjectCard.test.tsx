import { render, screen } from '@testing-library/react';
import ProjectCard from '../src/components/ProjectCard';

/**
 * @jest-environment jsdom
 */

describe('ProjectCard', () => {
  const props = {
    name: 'Test Project',
    description: 'This is a test project',
    goalAmount: 100000,
    collectedAmount: 50000,
    image: 'https://example.com/image.jpg',
    index: 1,
    id: 123,
  };

  it('renders the project name', () => {
    render(<ProjectCard {...props} />);
    const name = screen.getByText('Test Project');
    expect(name).toBeInTheDocument();
  });

  it('renders the project description', () => {
    render(<ProjectCard {...props} />);
    const description = screen.getByText('This is a test project');
    expect(description).toBeInTheDocument();
  });

  it('renders the goal amount', () => {
    render(<ProjectCard {...props} />);
    const goalAmount = screen.getByText('Este proyecto necesita $100.000 pesos ⚒️');
    expect(goalAmount).toBeInTheDocument();
  });

  it('renders the progress label', () => {
    render(<ProjectCard {...props} />);
    const progressLabel = screen.getByText('50%');
    expect(progressLabel).toBeInTheDocument();
  });

  it('renders the image', () => {
    render(<ProjectCard {...props} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

});