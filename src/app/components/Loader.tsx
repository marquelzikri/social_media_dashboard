import { VscLoading } from 'react-icons/vsc';

function Loader({label}: {label: string}) {
  return (
    <section className="grid items-center w-full h-full justify-items-center">
      <div className="grid justify-items-center">
        <VscLoading className="animate-spin" />
        <span>{label}</span>
      </div>
    </section>
  );
}

export default Loader;
