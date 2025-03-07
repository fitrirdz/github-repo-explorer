import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '.';
import { vi } from 'vitest';

test('renders search input and button', () => {
  render(
    <SearchBar
      username=''
      onChange={() => {}}
      onSubmit={() => {}}
      isLoading={false}
    />
  );

  expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
});

test('disables button when input is empty', () => {
  render(
    <SearchBar
      username=''
      onChange={() => {}}
      onSubmit={() => {}}
      isLoading={false}
    />
  );

  expect(screen.getByRole('button', { name: /search/i })).toBeDisabled();
});

test('calls onSubmit when button is clicked', () => {
  const onSubmitMock = vi.fn();
  render(
    <SearchBar
      username='test'
      onChange={() => {}}
      onSubmit={onSubmitMock}
      isLoading={false}
    />
  );

  fireEvent.click(screen.getByRole('button', { name: /search/i }));
  expect(onSubmitMock).toHaveBeenCalled();
});
