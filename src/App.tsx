import { useState } from 'react';
import SearchBar from './components/SearchBar';
import { User } from './interfaces/User';
import SearchResult from './components/SearchResult';
import api from './api';

export default function GitHubUserSearch() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const searchUsers = async () => {
    if (!username) return;

    try {
      setError('');
      setUsers([]);
      setIsLoading(true);

      const response = await api.get(
        `/search/users?per_page=100&q=${username}`
      );
      if (response.data.items.length === 0) throw new Error('No users found');

      setUsers(response.data.items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-screen min-h-screen text-gray-600 bg-gray-100'>
      <div className='mx-auto w-full min-h-screen md:w-2/3 md:shadow-md flex flex-col items-center px-16 py-8 bg-white'>
        <h1 className='text-2xl font-bold mb-4'>
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
        <SearchResult users={users} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
}
