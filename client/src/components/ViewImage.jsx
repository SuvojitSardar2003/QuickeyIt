import React from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

const ViewImage = ({ url, close }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-neutral-900/30 flex justify-center items-center z-[1000] p-4">
      <div className="w-full max-w-md max-h-[80vh] p-4 bg-white">
        <button
          onClick={close}
          className="text-neutral-900 block w-fit ml-auto cursor-pointer"
        >
          <IoClose size={25} />
        </button>
        <img
          src={url}
          alt="full screen"
          className="w-full h-full object-scale-down"
        />
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default ViewImage;
