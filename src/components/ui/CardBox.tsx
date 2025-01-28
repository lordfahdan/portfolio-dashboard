import { ReactNode } from 'react';

type CARDBOX_TYPE = {
  children: ReactNode;
  className?: string;
};

export const CardBox = ({ children, className = '' }: CARDBOX_TYPE) => {
  return (
    <div className={`box-widget shadow-lg p-4 ${className}`}>{children}</div>
  );
};
