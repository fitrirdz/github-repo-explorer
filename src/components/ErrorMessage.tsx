interface ErrorProps {
  text: string;
}

const ErrorMessage = ({ text }: ErrorProps) => {
  return (
    <div className='flex flex-1 justify-center items-center'>
      <p className='text-red-500 font-semibold'>{text}</p>
    </div>
  );
};

export default ErrorMessage;
