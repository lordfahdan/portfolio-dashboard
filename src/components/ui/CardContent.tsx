import { ReactNode } from 'react';

type CARD_CONTENT_TYPE = {
  children: ReactNode;
  className?: string;
};

export const CardContent = ({
  children,
  className = '',
}: CARD_CONTENT_TYPE) => {
  return <div className={`p-4 space-y-2 ${className}`}>{children}</div>;
};
