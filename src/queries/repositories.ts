import { useQuery } from '@tanstack/react-query';
import { fetchRepositories } from '../api/repositories';

export const useRepositories = (reposUrl: string) => {
  const enableFetching = reposUrl?.length > 0;

  return useQuery({
    queryKey: ['repos', reposUrl],
    queryFn: () => fetchRepositories(reposUrl),
    enabled: enableFetching,
  });
};
