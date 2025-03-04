const Loading = () => {
  return (
    <div className='flex flex-1 flex-row justify-center items-center gap-3'>
      <p>Loading</p>
      <div className='w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin'></div>
    </div>
  );
};

export default Loading;
