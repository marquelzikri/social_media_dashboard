import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

import { selectSidebar } from '../../features/sidebar/sidebarSlice';

import { useAppSelector } from '../hooks';
import clsx from 'clsx';

function Dashboard(props: any) {
  const location = useLocation();
  const isSidebarOpen = useAppSelector(selectSidebar);

  return (
    <div id="dashboard" className="flex w-screen h-screen p-4 overflow-hidden bg-gray-100 max-w-screen-2xl">
      <Sidebar />
      <section
        className={clsx(
          "h-full px-4 transition-all duration-500",
          isSidebarOpen ? "w-0 invisible sm:visible transform translate-x-full sm:translate-x-0 sm:transform-none sm:w-full" : "w-full"
        )}
      >
        <Header />
        <nav className="w-full px-2 my-6 font-sans">
          <ol className="flex text-2xl font-bold list-reset text-grey-dark">
            {location.pathname.split("/").map((path, index) => (
              <Fragment key={index}>
                {path !== "" ? (
                  <Fragment>
                    <li>{path}</li>
                    <li><span className="mx-2">/</span></li>
                  </Fragment>
                ) : null}
              </Fragment>
            ))}
            </ol>
        </nav>
        <main className="px-2 py-6 h-dashboard">
          {props.children}
        </main>
      </section>
    </div>
  );
}

export default Dashboard;
