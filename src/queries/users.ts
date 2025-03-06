import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/users';

export const useUsers = (keyword: string) => {
  return useQuery({
    queryKey: ['users', keyword],
    queryFn: () => fetchUsers(keyword),
    enabled: !!keyword,
  });
};
