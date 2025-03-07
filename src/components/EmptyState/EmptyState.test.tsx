import { render, screen } from '@testing-library/react';
import EmptyState from '.';

describe('EmptyState Component', () => {
  test('renders correctly', () => {
    render(<EmptyState />);

    expect(screen.getByTestId('empty-state')).toBeInTheDocument();

    expect(screen.getByText(/No results found/i)).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /folder/i });
    expect(img).toHaveAttribute('src', '/folder.png');
    expect(img).toHaveAttribute('alt', 'folder');
  });
});
