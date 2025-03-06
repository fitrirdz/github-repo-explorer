import { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
import { useUsers } from './queries/users';

export default function App() {
  const [username, setUsername] = useState('');
  const [keyword, setKeyword] = useState('');
  const { data: users, isLoading, error } = useUsers(keyword);

  const searchUsers = () => {
    setKeyword(username);
  };

  return (
    <div className='w-screen min-h-screen text-gray-600 bg-gray-100'>
      <div className='mx-auto flex flex-col items-center px-6 py-8 bg-white w-full min-h-screen sm:px-16 md:w-2/3 md:shadow-md'>
        <h1 className='text-2xl font-bold mb-4 text-center'>
          GitHub Repositories Explorer
        </h1>

        {/* Search Bar */}
        <SearchBar
          username={username}
          onChange={setUsername}
          onSubmit={searchUsers}
          isLoading={isLoading}
        />

        {/* User List */}
        <SearchResult
          users={users || []}
          error={error}
          keyword={keyword}
          isLoadingResult={isLoading}
        />
      </div>
    </div>
  );
}
