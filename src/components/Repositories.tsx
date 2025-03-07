import { StarIcon } from '@heroicons/react/24/solid';

import { Repository } from '../interfaces/Repository';
import { formatNumber } from '../utils/common';
import Loading from './Loading';
import EmptyState from './EmptyState';

interface RepositoriesProps {
  repositories: Repository[];
  isExpanded: boolean;
  isLoading: boolean;
}
const Repositories = ({
  repositories,
  isExpanded,
  isLoading,
}: RepositoriesProps) => {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isExpanded ? 'max-h-96 mt-3 overflow-y-auto' : 'max-h-0'
      }`}
    >
      {isExpanded && isLoading ? (
        <div className='h-20 flex items-center'>
          <Loading />
        </div>
      ) : isExpanded ? (
        repositories.length > 0 ? (
          <div className='pl-5 pr-0 space-y-2'>
            {repositories?.map((repo) => (
              <div
                key={repo.name}
                className='flex items-start space-x-4 p-2 rounded-xs bg-gray-300'
              >
                <div className='flex flex-col overflow-hidden w-9/12'>
                  <p className='font-bold'>{repo.name}</p>
                  <p className='text-sm text-gray-600 truncate'>
                    {repo.description || 'No description'}
                  </p>
                </div>
                <div className='flex items-center justify-end font-semibold text-sm text-gray-700 w-3/12 truncate space-x-1'>
                  <span className=''>
                    {formatNumber(repo.stargazers_count)}
                  </span>
                  <span>
                    <StarIcon className='size-4' />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState />
        )
      ) : null}
    </div>
  );
};

export default Repositories;
