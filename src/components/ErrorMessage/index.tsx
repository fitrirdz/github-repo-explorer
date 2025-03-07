import errorImg from '/error-icon.png';

interface ErrorProps {
  text: string;
}

const ErrorMessage = ({ text }: ErrorProps) => {
  return (
    <div className='w-full flex-1 flex flex-col items-center justify-center space-y-3'>
      <img
        src={errorImg}
        width={100}
        height={100}
        alt='error'
        className='opacity-85'
      />
      <h3 className='text-xl font-semibold text-red-500 opacity-85'>{text}</h3>
    </div>
  );
};

export default ErrorMessage;
