import { memo } from 'react';
import { User } from '../interfaces/User';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import { ChevronDownIcon, StarIcon } from '@heroicons/react/24/solid';
import { Repository } from '../interfaces/Repository';

interface SearchResultProps {
  users: User[];
  error: string;
  isLoading: boolean;
  keyword: string;
  handleClick: (index: number) => void;
  repositories: Repository[];
}

const SearchResult = memo(
  ({
    users,
    error,
    isLoading,
    keyword,
    handleClick,
    repositories,
  }: SearchResultProps) => {
    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorMessage text={error} />;
    }

    return (
      <div className='mt-4 space-y-3 w-full'>
        {users?.length > 0 && !isLoading && (
          <p className='font-semibold'>Showing users for "{keyword}"</p>
        )}
        {users?.map((user, index) => (
          <div
            key={user.login}
            className='relative bg-gray-200 text-black p-4 rounded-lg shadow'
          >
            {/* User Header */}
            <div className='flex justify-between items-center'>
              <h2 className='text-lg font-semibold'>{user.login}</h2>
              <button
                className='cursor-pointer focus:outline-none'
                aria-label='Expand list'
                onClick={() => handleClick(index)}
              >
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform duration-300 ${
                    user.isActive ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                user?.isActive ? 'max-h-96 mt-3 overflow-y-auto' : 'max-h-0'
              }`}
            >
              <div className='bg-gray-100 p-3 rounded-md shadow-inner space-y-2'>
                {repositories.map((repo) => (
                  <div key={repo.name} className='border p-2 rounded'>
                    <p className='font-medium'>{repo.name}</p>
                    <p className='text-sm text-gray-600'>
                      {repo.description || 'No description'}
                    </p>
                    <span className='flex items-center text-sm text-gray-700'>
                      {repo.stargazers_count}{' '}
                      <StarIcon className='h-4 w-4 text-yellow-500 ml-1' />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

SearchResult.displayName = 'SearchResult';
export default SearchResult;
