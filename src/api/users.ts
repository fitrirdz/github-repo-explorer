import api from '.';
import { User } from '../interfaces/User';

export const fetchUsers = async (username: string): Promise<User[]> => {
  const { data } = await api.get(`/search/users?per_page=5&q=${username}`);

  return data.items;
};
