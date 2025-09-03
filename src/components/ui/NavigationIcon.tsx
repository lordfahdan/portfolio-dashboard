import { IconType } from 'react-icons';
import {
  AiFillHome,
  AiFillProfile,
  AiFillProject,
  AiFillTrophy,
} from 'react-icons/ai';
import { NavLink } from 'react-router';

type NAVIGATION_ICON_TYPE = {
  type: string;
  text: string;
  size: string | number;
  color: string;
  expand: boolean;
  link: string;
};

const iconMapActive: { [key: string]: IconType } = {
  home: AiFillHome,
  projects: AiFillProject,
  profile: AiFillProfile,
  achievement: AiFillTrophy,
};

const NavigationIcon = ({
  type,
  text,
  size,
  color,
  expand,
  link,
}: NAVIGATION_ICON_TYPE) => {
  const IconComponent = iconMapActive[type];

  return IconComponent ? (
    <div>
      <NavLink to={link}>
        {({ isActive }) => (
          <div
            className={`transition rounded-md capitalize font-semibold text-base flex items-center justify-start gap-2 p-2 px-4 ${
              isActive ? 'bg-gray-400 cursor-default' : ''
            }`}
          >
            <div
              className={`flex items-center justify-center p-2 rounded-lg ${
                isActive ? 'bg-blue-700' : 'bg-blue-950'
              }`}
            >
              <IconComponent size={size} color={isActive ? '#fff' : color} />
            </div>
            {expand && <span className="whitespace-nowrap">{text}</span>}
          </div>
        )}
      </NavLink>
    </div>
  ) : null;
};

export default NavigationIcon;
