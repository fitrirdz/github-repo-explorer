import { KeyboardEvent } from 'react';

interface SerchBarProps {
  username: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const SearchBar = ({ username, onChange, onSubmit }: SerchBarProps) => {
  const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document?.getElementById('submit')?.click();
    }
  };

  return (
    <div className='w-full flex flex-col sm:flex-row gap-2'>
      <input
        type='text'
        className='flex-1 border border-gray-300 rounded-xs p-2 bg-gray-100 placeholder-gray-300'
        placeholder='Enter username'
        value={username}
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={(e) => handleEnter(e)}
        maxLength={50}
      />
      <button
        className='bg-[#1189cf] text-white px-4 py-2 rounded-xs w-full sm:w-auto'
        onClick={onSubmit}
        id='submit'
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
