import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

function Dashboard(props: any) {
  const location = useLocation();

  return (
    <div id="dashboard" className="flex w-screen h-screen p-4 overflow-hidden bg-gray-100 max-w-screen-2xl">
      <Sidebar />
      <section className="w-full h-full px-4">
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
