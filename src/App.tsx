import { useState } from 'react';
import SearchBar from './components/SearchBar';
import { User } from './interfaces/User';
import SearchResult from './components/SearchResult';
import api from './api';
import { Repository } from './interfaces/Repository';

export default function App() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const searchUsers = async () => {
    if (!username) return;

    try {
      setError('');
      setUsers([]);
      setIsLoading(true);
      setKeyword(username);

      const response = await api.get(`/search/users?per_page=5&q=${username}`);
      if (response.data.items.length === 0) throw new Error('No users found');
      const { items } = response.data;
      const tempUsers: User[] = items?.map((item: User) => {
        return {
          ...item,
          isActive: false,
        };
      });
      setUsers(tempUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async (index: number) => {
    const temp = users.map((user, i) => {
      if (i === index) {
        return {
          ...user,
          isActive: !user.isActive,
        };
      }
      return user;
    });

    setUsers(temp as User[]);

    if (users[index].isActive) {
      setRepositories([]);
      return;
    }

    try {
      const reposUrl = users[index].repos_url;
      setError('');

      const response = await api.get(`${reposUrl}`);
      if (response.data.length === 0) throw new Error('No users found');
      const { data } = response;
      setRepositories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
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
          users={users}
          isLoading={isLoading}
          error={error}
          keyword={keyword}
          handleClick={handleClick}
          repositories={repositories}
        />
      </div>
    </div>
  );
}
