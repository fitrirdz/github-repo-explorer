import { render, screen } from '@testing-library/react';

import { Repository } from '../../interfaces/repository';
import Repositories from '.';

describe('Repositories Component', () => {
  const mockRepositories: Repository[] = [
    {
      name: 'test-repo',
      full_name: 'user/test-repo',
      html_url: 'https://github.com/user/test-repo',
      description: 'This is a test repository',
      stargazers_count: 100,
    },
  ];

  test('renders nothing when not expanded', () => {
    render(
      <Repositories
        repositories={mockRepositories}
        isExpanded={false}
        isLoading={false}
      />
    );
    expect(screen.queryByText('test-repo')).not.toBeInTheDocument();
  });

  test('renders loading state when expanded and isLoading is true', () => {
    render(
      <Repositories
        repositories={mockRepositories}
        isExpanded={true}
        isLoading={true}
      />
    );
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('renders repository data when expanded and not loading', () => {
    render(
      <Repositories
        repositories={mockRepositories}
        isExpanded={true}
        isLoading={false}
      />
    );

    expect(screen.getByText('test-repo')).toBeInTheDocument();
    expect(screen.getByText('This is a test repository')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  test('renders empty state when expanded but no repositories are available', () => {
    render(
      <Repositories repositories={[]} isExpanded={true} isLoading={false} />
    );
    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });
});
