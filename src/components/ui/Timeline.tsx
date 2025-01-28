// Timeline Component
import { ReactNode } from 'react';

type TIMELINE_TYPE = {
  children: ReactNode;
  className?: string;
};

export const Timeline = ({ children, className = '' }: TIMELINE_TYPE) => {
  return (
    <ul className={`space-y-4 border-l-2 border-gray-600 pl-4 ${className}`}>
      {children}
    </ul>
  );
};

Timeline.Item = ({ children }: TIMELINE_TYPE) => {
  return (
    <li className="relative pl-6">
      <span className="absolute top-1 left-0 w-4 h-4 bg-blue-600 rounded-full"></span>
      <div className="text-gray-300">{children}</div>
    </li>
  );
};
