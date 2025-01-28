import { ReactNode } from 'react';

type BUTTON_TYPE = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Button = ({
  children,
  className = '',
  onClick = () => {},
}: BUTTON_TYPE) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg shadow-md transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};
