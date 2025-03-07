import { memo, useState } from 'react';
import { User } from '../interfaces/User';
import ErrorMessage from './ErrorMessage';
import Loading from './Loading';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Repositories from './Repositories';
import { useRepositories } from '../queries/repositories';
import EmptyState from './EmptyState';

interface SearchResultProps {
  users: User[];
  error: Error | null;
  keyword: string;
  isLoadingResult: boolean;
}

const SearchResult = memo(
  ({ users, error, keyword, isLoadingResult }: SearchResultProps) => {
    const [url, setUrl] = useState<string>('');
    const { data: repositories, isLoading } = useRepositories(url);

    const handleClick = (reposUrl: string) => {
      if (reposUrl === url) {
        setUrl('');
        return;
      }
      setUrl(reposUrl);
    };

    if (isLoadingResult && users?.length === 0) {
      return <Loading />;
    }

    if (error) {
      return <ErrorMessage text={error.message} />;
    }

    if (users.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className='mt-4 space-y-3 w-full'>
        {users?.length > 0 && !isLoading && (
          <p className='font-semibold'>Showing users for "{keyword}"</p>
        )}
        {users?.map((user) => {
          const isExpanded = user.repos_url === url;

          return (
            <div key={user.login} className='relative'>
              {/* User Header */}
              <div
                className='flex justify-between items-center bg-gray-200 text-black p-4 rounded-xs shadow'
                onClick={() => handleClick(user.repos_url)}
              >
                <h2 className='text-lg font-semibold'>{user.login}</h2>
                <span
                  className='cursor-pointer focus:outline-none'
                  aria-label='Expand list'
                >
                  <ChevronDownIcon
                    className={`h-5 w-5 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </span>
              </div>

              <Repositories
                repositories={repositories || []}
                isExpanded={isExpanded}
                isLoading={isLoading}
              />
            </div>
          );
        })}
      </div>
    );
  }
);

SearchResult.displayName = 'SearchResult';
export default SearchResult;
