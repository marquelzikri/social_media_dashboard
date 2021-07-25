import { MouseEventHandler, ReactNode } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

function Modal(props: { isVisible: boolean, onClose: MouseEventHandler<HTMLButtonElement>, children: ReactNode }) {
  if (!props.isVisible) return null;
  return (
    <>
      <div id="dimmer" className="absolute top-0 left-0 w-screen h-screen bg-gray-800 opacity-80"></div>
      <button
        className="absolute z-10 p-4 text-lg text-white top-4 right-4 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200"
        onClick={props.onClose}
        aria-label="close modal"
      >
        <IoCloseSharp />
      </button>
      <div id="modal" className="absolute top-0 left-0 grid items-center w-screen h-screen justify-items-center">
        {props.children}
      </div>
    </>
  );
}

export default Modal;
