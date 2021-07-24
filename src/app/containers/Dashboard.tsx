import Header from './Header';
import Sidebar from './Sidebar';

function Dashboard(props: any) {
  return (
    <div id="dashboard" className="flex w-screen h-screen p-4 overflow-hidden bg-gray-100">
      <Sidebar />
      <section className="w-full h-full px-4">
        <Header />
        <main className="h-full px-2 py-6 overflow-y-auto">
          {props.children}
        </main>
      </section>
    </div>
  );
}

export default Dashboard;
