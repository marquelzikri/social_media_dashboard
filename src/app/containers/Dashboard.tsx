import Header from './Header';
import Sidebar from './Sidebar';

function Dashboard(props: any) {
  return (
    <div id="dashboard" className="flex w-screen h-screen p-4 overflow-hidden bg-gray-100 max-w-screen-2xl">
      <Sidebar />
      <section className="w-full h-full px-4">
        <Header />
        <h1 className="text-2xl font-bold">Users</h1>
        <main className="h-full px-2 py-6 overflow-auto" style={{height: "calc(100% - 6rem)"}}>
          {props.children}
        </main>
      </section>
    </div>
  );
}

export default Dashboard;
