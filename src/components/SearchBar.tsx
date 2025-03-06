import { KeyboardEvent } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';

interface SearchBarProps {
  username: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SearchBar = ({
  username,
  onChange,
  onSubmit,
  isLoading,
}: SearchBarProps) => {
  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document?.getElementById('submit')?.click();
    }
  };

  return (
    <div className='w-full flex flex-col sm:flex-row gap-3'>
      <div className='relative flex-1'>
        <input
          type='text'
          className='w-full border-2 border-gray-300 rounded-xs p-2 pr-10 bg-gray-100 placeholder-gray-300 focus:border-sky-600'
          placeholder='Enter username'
          value={username}
          onChange={(e) => onChange(e.target.value)}
          onKeyUp={(e) => handleEnter(e)}
          maxLength={50}
        />

        {username.length > 0 && (
          <span
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
            onClick={() => onChange('')}
            aria-label='Clear input'
          >
            <XCircleIcon className='h-5 w-5' />
          </span>
        )}
      </div>

      <button
        className='bg-sky-600 text-white px-4 py-2 rounded-xs w-full sm:w-32 active:bg-sky-700 disabled:bg-gray-400 focus:border-2 focus:border-sky-700'
        onClick={onSubmit}
        id='submit'
        disabled={username.length === 0 || isLoading}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};

export default SearchBar;
