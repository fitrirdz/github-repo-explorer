import { useState } from 'react';

type GitHubUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
};

export default function GitHubSearch() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState('');

  const searchUser = async () => {
    if (!username) return;

    try {
      setError('');
      setUser(null);
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) throw new Error('User not found');

      const data: GitHubUser = await response.json();
      setUser(data);
    } catch (err) {
      setError('User not found');
      console.error(err);
    }
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <h1 className='text-2xl font-bold mb-4'>GitHub User Search</h1>
      <input
        type='text'
        className='border rounded p-2'
        placeholder='Enter GitHub username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'
        onClick={searchUser}
      >
        Search
      </button>

      {error && <p className='text-red-500 mt-2'>{error}</p>}

      {user && (
        <div className='mt-4 border p-4 rounded shadow-md text-center'>
          <img
            src={user.avatar_url}
            alt={user.login}
            className='w-24 h-24 rounded-full mx-auto'
          />
          <h2 className='text-lg font-semibold'>{user.name || user.login}</h2>
          <p className='text-gray-600'>{user.bio}</p>
          <a href={user.html_url} target='_blank' className='text-blue-500'>
            View Profile
          </a>
        </div>
      )}
    </div>
  );
}
