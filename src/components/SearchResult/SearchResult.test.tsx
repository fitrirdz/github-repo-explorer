import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useRepositories } from '../../queries/repositories';
import { User } from '../../interfaces/user';
import SearchResult from '.';

vi.mock('../../queries/repositories', () => ({
  useRepositories: vi.fn(),
}));

const mockUsers: User[] = [
  {
    login: 'johnDoe',
    repos_url: 'https://api.github.com/users/johnDoe/repos',
    avatar_url: 'https://api.github.com/avatar/johnDoe',
    html_url: 'https://api.github.com/johnDoe',
  },
  {
    login: 'janeDoe',
    repos_url: 'https://api.github.com/users/janeDoe/repos',
    avatar_url: 'https://api.github.com/avatar/janeDoe',
    html_url: 'https://api.github.com/janeDoe',
  },
];

describe('SearchResult Component', () => {
  beforeEach(() => {
    (useRepositories as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
  });

  it('renders loading state when isLoadingResult is true', () => {
    render(
      <SearchResult
        users={[]}
        error={null}
        keyword='test'
        isLoadingResult={true}
      />
    );
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('displays an error message when an error occurs', () => {
    render(
      <SearchResult
        users={[]}
        error={new Error('Network error')}
        keyword='test'
        isLoadingResult={false}
      />
    );
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });

  it('shows empty state when no users are found', () => {
    render(
      <SearchResult
        users={[]}
        error={null}
        keyword='test'
        isLoadingResult={false}
      />
    );
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('displays a list of users when results are available', () => {
    (useRepositories as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(
      <SearchResult
        users={mockUsers}
        error={null}
        keyword='test'
        isLoadingResult={false}
      />
    );

    expect(screen.getByText('Showing users for "test"')).toBeInTheDocument();
    expect(screen.getByText('johnDoe')).toBeInTheDocument();
    expect(screen.getByText('janeDoe')).toBeInTheDocument();
  });

  it('toggles repository visibility when clicking a user', async () => {
    (useRepositories as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(
      <SearchResult
        users={mockUsers}
        error={null}
        keyword='test'
        isLoadingResult={false}
      />
    );

    const userElement = screen.getByText('johnDoe');
    fireEvent.click(userElement);

    expect(useRepositories).toHaveBeenCalledWith(mockUsers[0].repos_url);
  });
});
