import { KeyboardEvent } from 'react';

interface SerchBarProps {
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
}: SerchBarProps) => {
  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document?.getElementById('submit')?.click();
    }
  };

  return (
    <div className='w-full flex flex-col sm:flex-row gap-3'>
      <input
        type='text'
        className='flex-1 border-2 border-gray-300 rounded-xs p-2 bg-gray-100 placeholder-gray-300 focus:border-sky-600'
        placeholder='Enter username'
        value={username}
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={(e) => handleEnter(e)}
        maxLength={50}
      />
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
