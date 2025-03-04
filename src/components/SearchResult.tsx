import { User } from '../interfaces/User';
import ErrorMessage from './ErrorMessage';

import Loading from './Loading';

interface SearchResultProps {
  users: User[];
  error: string;
  isLoading: boolean;
}

const SearchResult = ({ users, error, isLoading }: SearchResultProps) => {
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage text={error} />;
  }

  return (
    <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {users?.map((user) => (
        <div
          key={user.login}
          className='border p-4 rounded shadow-md text-center'
        >
          <img
            src={user.avatar_url}
            alt={user.login}
            className='w-16 h-16 rounded-full mx-auto'
          />
          <h2 className='text-lg font-semibold mt-2'>{user.login}</h2>
          <a href={user.html_url} target='_blank' className='text-blue-500'>
            View Profile
          </a>
        </div>
      ))}
    </div>
  );
};

export default SearchResult;
