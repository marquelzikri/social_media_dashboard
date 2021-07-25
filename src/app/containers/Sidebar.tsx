import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { useAppSelector } from '../hooks';

import { selectSidebar } from '../../features/sidebar/sidebarSlice';
import { forwardRef } from 'react';

type Route = {
  label: string;
  path: string;
};

function Sidebar() {
  const isSidebarOpen = useAppSelector(selectSidebar);
  const routes: Route[] = [
    {
      label: 'Users',
      path: '/users',
    },
    {
      label: 'Posts',
      path: '/posts',
    },
    {
      label: 'Albums',
      path: '/albums',
    },
  ];

  return (
    <aside
      className={clsx(
        "relative hidden h-full lg:block transform transition-all duration-700",
        isSidebarOpen ? "translate-x-0 w-80" : "-translate-x-full w-0 overflow-hidden",
      )}
    >
      <div className="h-full bg-white shadow-lg rounded-2xl dark:bg-gray-700">
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
            {routes.map((route, index) => (<SidebarItem key={index} {...route} />))}
          </div>
        </nav>
      </div>
    </aside>
  );
}

const SidebarItem = forwardRef((props: Route) => {
  const { label, path } = props;

  return (
    <NavLink
      to={path}
      className="flex items-center justify-start w-full p-4 my-2 font-thin text-gray-500 uppercase transition-all duration-200 dark:text-gray-200 hover:text-blue-500"
      activeClassName="text-blue-500 border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100 dark:from-gray-700 dark:to-gray-800"
    >
      <span className="text-left">
        <svg width="20" fill="currentColor" height="20" className="w-5 h-5" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z">
          </path>
        </svg>
      </span>
      <span className="mx-4 text-sm font-normal">
        {label}
      </span>
    </NavLink>
  );
});

export default Sidebar;
