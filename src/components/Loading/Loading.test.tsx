import { render, screen } from '@testing-library/react';
import Loading from '.';

describe('Loading Component', () => {
  test('renders loading text and spinner', () => {
    render(<Loading />);

    expect(screen.getByText('Loading')).toBeInTheDocument();

    const spinner = screen.getByTestId('loading');
    expect(spinner).toBeInTheDocument();
  });
});
