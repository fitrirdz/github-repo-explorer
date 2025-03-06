import api from '.';
import { Repository } from '../interfaces/Repository';

export const fetchRepositories = async (
  reposUrl: string
): Promise<Repository[]> => {
  const { data } = await api.get(`${reposUrl}`);

  return data;
};
