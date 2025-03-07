import { render, screen } from '@testing-library/react';
import ErrorMessage from '.';

describe('ErrorMessage Component', () => {
  test('renders correctly with given error text', () => {
    const errorText = 'Something went wrong';

    render(<ErrorMessage text={errorText} />);

    expect(screen.getByText(errorText)).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /error/i });
    expect(img).toHaveAttribute('src', '/error-icon.png');
    expect(img).toHaveAttribute('alt', 'error');
  });
});
