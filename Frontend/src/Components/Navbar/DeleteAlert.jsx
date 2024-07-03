import React from 'react';

const DeleteAlert = ({ onConfirm, onCancel }) => {
  return (
    <div id="alert-additional-content-2" className="fixed inset-0 z-50 overflow-y-auto p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow w-full max-w-md p-6">
          <div className="flex items-center">
            <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <h3 className="text-lg font-medium">This is a danger alert</h3>
          </div>
          <div className="mt-2 mb-4 text-sm">
            Are you sure you want to delete this password? This action cannot be undone.
          </div>
          <div className="flex justify-end">
            <button onClick={onCancel} type="button" className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2">
              Dismiss
            </button>
            <button onClick={onConfirm} type="button" className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
