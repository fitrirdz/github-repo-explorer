import { render, screen } from '@testing-library/react';
import InitialView from '.';

describe('InitialView Component', () => {
  test('renders correctly with default message and image', () => {
    render(<InitialView />);

    expect(screen.getByText('Type a username to begin')).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /github/i });
    expect(img).toHaveAttribute('src', '/github-user.png');
    expect(img).toHaveAttribute('alt', 'github');
  });
});
