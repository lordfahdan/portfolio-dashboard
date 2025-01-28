import { useEffect, useState } from 'react';
import { AiOutlineSetting, AiFillHome } from 'react-icons/ai';
import { NavLink, useLocation } from 'react-router';

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const location = useLocation();
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const convertLocationToHistory = location.pathname.substring(1).split('/');
    setHistory(convertLocationToHistory);
  }, [location.pathname]);

  const indexToPathname = (id: number): string => {
    const result = history.slice(0, id).join('/');

    return result;
  };

  return (
    <header
      className={`z-50 sticky top-6 left-auto right-0 transition duration-400 px-4 py-2 backdrop-blur-sm rounded-2xl ${
        scrollPosition > 0 ? 'shadow-[0px_0px_0px_2px_rgba(255,255,255,1)]' : ''
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="shrink-0">
          <div className="flex gap-2 items-center justify-start capitalize">
            <NavLink to={`/`}>
              <AiFillHome size={16} color="#fff" />
            </NavLink>
            <span>/</span>
            {history.map((item, index) => (
              <div className="flex gap-2 items-center justify-start" key={item}>
                {index !== 0 && <span>/</span>}
                <NavLink to={`/${indexToPathname(index)}`}>
                  {({ isActive }) => (
                    <span
                      className={`capitalize text-base ${
                        isActive
                          ? 'text-amber-400 cursor-default'
                          : 'text-gray-400'
                      }`}
                    >
                      {item !== '' ? item : 'Dashboard'}
                    </span>
                  )}
                </NavLink>
              </div>
            ))}
          </div>
          <h1 className="mt-2 text-2xl font-bold capitalize">
            {history[history.length - 1] !== ''
              ? history[history.length - 1]
              : 'Dashboard'}
          </h1>
        </div>
        <div className="shrink-0">
          <AiOutlineSetting className="cursor-pointer" size={24} color="#fff" />
        </div>
      </div>
    </header>
  );
};

export default Header;
