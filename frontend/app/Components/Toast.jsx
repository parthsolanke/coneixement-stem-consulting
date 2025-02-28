import { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className="fixed left-1/2 top-24 -translate-x-1/2 z-[100]">
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-down`}>
        {message}
      </div>
    </div>
  );
};

export default Toast;
