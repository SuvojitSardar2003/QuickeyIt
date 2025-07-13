// components/ConfirmLogoutModal.js
import React from "react";

const ConfirmLogout = ({ onConfirm, onCancel }) => {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4  bg-neutral-900/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
        <p className="text-lg font-semibold mb-4">Do you want to log out?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmLogout;
