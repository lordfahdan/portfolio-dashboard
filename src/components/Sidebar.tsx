import NavigationIcon from '@main/components/ui/NavigationIcon';
import { AiOutlineProduct } from 'react-icons/ai';

type SIDEBAR_TYPE = {
  expand: boolean;
  funcExpand: () => void;
};

const Sidebar = ({ expand, funcExpand }: SIDEBAR_TYPE) => {
  return (
    <div className="shrink-0 rounded-2xl fixed top-4 left-4 right-auto bottom-4 flex flex-col box-widget whitespace-nowrap">
      <div
        className={`px-2 pt-2 pb-2 flex items-center gap-10 ${
          expand ? 'justify-between' : 'justify-center'
        }`}
      >
        {expand && (
          <h1 className="font-logo text-2xl font-bold bg-linear-30 from-blue-500 to-purple-500 to-75% text-transparent bg-clip-text">
            Lord's Center
          </h1>
        )}
        <AiOutlineProduct
          className="cursor-pointer mt-1"
          size={24}
          color="#fff"
          onClick={() => funcExpand()}
        />
      </div>
      <div className="my-4 mx-[-4px] border-solid border-[rgba(0,0,0,0.8)] border-b-0 shrink-0 h-[1.5px] opacity-25 bg-gradient-to-r from-10% from-[rgba(0,117,255, 0.2)] via-[rgba(255,255,255,0.8)] to-[rgba(255,255,255,0.1)]" />
      <ul className="flex flex-col gap-2">
        <NavigationIcon
          type="home"
          text="dashboard"
          color="#1447e6"
          size={16}
          expand={expand}
          link={'/'}
        />
        {/* <NavigationIcon
          type="projects"
          text="projects"
          color="#1447e6"
          size={16}
          expand={expand}
          link={'/projects'}
        /> */}
        <NavigationIcon
          type="profile"
          text="profile"
          color="#1447e6"
          size={16}
          expand={expand}
          link={'/profile'}
        />
        <NavigationIcon
          type="achievement"
          text="achievement"
          color="#1447e6"
          size={16}
          expand={expand}
          link={'/achievement'}
        />
      </ul>
    </div>
  );
};

export default Sidebar;
