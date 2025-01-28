import { ReactNode } from 'react';

type CARD_TYPE = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = '' }: CARD_TYPE) => {
  return (
    <div className={`box-widget shadow-lg p-4 sticky top-32 z-10 ${className}`}>{children}</div>
  );
};
