import { AiOutlineMenuFold } from 'react-icons/ai';

import { useAppDispatch, useAppSelector } from '../hooks';

import { selectSidebar, toggleSidebar } from '../../features/sidebar/sidebarSlice';

function Header() {
  return (
    <header className="flex justify-between">
      <SidebarToggle />
      <ProfileCard />
    </header>
  );
}

function SidebarToggle() {
  const isSidebarOpen = useAppSelector(selectSidebar);
  const dispatch = useAppDispatch();

  const onClick = () => dispatch(toggleSidebar());

  return (
    <button
      className="text-2xl transition duration-500 ease-in-out transform hover:scale-95"
      style={{...(!isSidebarOpen ? {transform: 'scaleX(-1)'}:{})}}
      onClick={onClick}
      aria-label="sidebar-toggle"
    >
      <AiOutlineMenuFold />
    </button>
  );
}

function ProfileCard() {
  return (
    <div className="flex justify-center h-16 bg-white shadow-lg dark:bg-gray-800 rounded-2xl w-44">
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-600 dark:text-white">
            Charlie
          </span>
          <span className="text-xs text-gray-500">
            Admin
          </span>
        </div>
        <div className="flex-shrink-0">
          <a href="/#" className="relative block">
            <img alt="profile" src="https://www.tailwind-kit.com/images/person/1.jpg" className="object-cover w-10 h-10 mx-auto rounded-full " />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
