import Header from '@main/components/ui/Header';
import Sidebar from '@main/components/ui/Sidebar';
import { useState, type ReactNode } from 'react';

type LAYOUT_DASHBOARD_TYPE = {
  children: ReactNode;
};

const LayoutDashboard = ({ children }: LAYOUT_DASHBOARD_TYPE) => {
  const [expand, setExpand] = useState(true);

  const funcExpand = () => {
    setExpand((newValue) => !newValue)
  }
  
  return (
    <div className="p-10 px-12 bg-cover" id="body">
      <div className="text-white">
        <Sidebar expand={expand} funcExpand={funcExpand} />
        <div className={`${expand? 'ml-[260px]' : 'ml-[85px]'}`}>
          <Header />
          <div className="pt-10 min-h-[80.5vh]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutDashboard;
