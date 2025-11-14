import { FiLoader } from 'react-icons/fi';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <FiLoader className="animate-spin text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500" />
    </div>
  );
};

export default LoadingSpinner;