import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { ReactElement } from 'react';
import { BiPhotoAlbum } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { IoCloseSharp } from 'react-icons/io5';
import { IoIosPaper } from 'react-icons/io';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { selectSidebar, toggleSidebar } from './sidebarSlice';

type Route = {
  label: string;
  path: string;
  icon: ReactElement;
};

function Sidebar() {
  const dispatch = useAppDispatch();
  const onClick = () => dispatch(toggleSidebar());

  const isSidebarOpen = useAppSelector(selectSidebar);
  const routes: Route[] = [
    {
      label: 'Users',
      path: '/users',
      icon: <FiUsers />
    },
    {
      label: 'Posts',
      path: '/posts',
      icon: <IoIosPaper />
    },
    {
      label: 'Albums',
      path: '/albums',
      icon: <BiPhotoAlbum />
    },
  ];

  return (
    <aside
      className={clsx(
        "relative h-full lg:block transform transition-all duration-500",
        isSidebarOpen ? "translate-x-0 w-full sm:w-80" : "-translate-x-full w-0 overflow-hidden",
      )}
    >
      <div className="h-full bg-white shadow-lg rounded-2xl dark:bg-gray-700">
        <IoCloseSharp className="absolute text-lg top-4 right-4 sm:hidden" onClick={onClick} />
        <div className="flex items-center justify-center pt-6">
          <svg width="35" height="30" viewBox="0 0 256 366" version="1.1" preserveAspectRatio="xMidYMid">
            <defs>
              <linearGradient x1="12.5189534%" y1="85.2128611%" x2="88.2282959%" y2="10.0225497%" id="linearGradient-1">
                <stop stopColor="#FF0057" stopOpacity="0.16" offset="0%">
                </stop>
                <stop stopColor="#FF0057" offset="86.1354%">
                </stop>
              </linearGradient>
            </defs>
            <g>
              <path d="M0,60.8538006 C0,27.245261 27.245304,0 60.8542121,0 L117.027019,0 L255.996549,0 L255.996549,86.5999776 C255.996549,103.404155 242.374096,117.027222 225.569919,117.027222 L145.80812,117.027222 C130.003299,117.277829 117.242615,130.060011 117.027019,145.872817 L117.027019,335.28252 C117.027019,352.087312 103.404567,365.709764 86.5997749,365.709764 L0,365.709764 L0,117.027222 L0,60.8538006 Z" fill="#001B38">
              </path>
              <circle fill="url(#linearGradient-1)" transform="translate(147.013244, 147.014675) rotate(90.000000) translate(-147.013244, -147.014675) " cx="147.013244" cy="147.014675" r="78.9933938">
              </circle>
              <circle fill="url(#linearGradient-1)" opacity="0.5" transform="translate(147.013244, 147.014675) rotate(90.000000) translate(-147.013244, -147.014675) " cx="147.013244" cy="147.014675" r="78.9933938">
              </circle>
            </g>
          </svg>
        </div>
        <nav className="mt-6">
          <div>
            {routes.map((route, index) => (<SidebarItem key={index} isSidebarOpen={isSidebarOpen} {...route} />))}
          </div>
        </nav>
      </div>
    </aside>
  );
}

function SidebarItem(props: Route & {isSidebarOpen: boolean}) {
  const { label, path, icon, isSidebarOpen } = props;

  return (
    <NavLink
      to={path}
      className={clsx(
        "flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-all duration-1000 dark:text-gray-200 hover:text-blue-500",
        isSidebarOpen ? "translate-x-0 w-full" : "-translate-x-full w-0 invisible"
      )}
      activeClassName="text-blue-500 border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100 dark:from-gray-700 dark:to-gray-800"
    >
      <span className="text-left">
        {icon}
      </span>
      <span className="mx-4 text-sm font-normal">
        {label}
      </span>
    </NavLink>
  );
};

export default Sidebar;
