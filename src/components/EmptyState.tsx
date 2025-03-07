import folderImg from '/folder.png';

const EmptyState = () => {
  return (
    <div className='w-full flex-1 flex flex-col items-center justify-center space-y-3'>
      <img
        src={folderImg}
        width={100}
        height={100}
        alt='folder'
        className='opacity-45'
      />
      <h3 className='text-lg font-semibold text-black opacity-45'>
        No results found
      </h3>
    </div>
  );
};

export default EmptyState;
