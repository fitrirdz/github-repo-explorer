import githubImg from '/github-user.png';

const InitialView = () => {
  return (
    <div className='w-full flex-1 flex flex-col items-center justify-center space-y-3'>
      <img
        src={githubImg}
        width={150}
        height={150}
        alt='github'
        className='opacity-85 shadow-md rounded-full'
      />
      <h3 className='text-xl font-semibold text-sky-600 opacity-55'>
        Type a username to begin
      </h3>
    </div>
  );
};

export default InitialView;
