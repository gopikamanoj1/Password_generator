import React, { useEffect, useState } from 'react';
import { FaCopy } from 'react-icons/fa'; // Importing the copy icon from react-icons
import axiosInstance from '../../config/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowSavedPasswords = () => {
  const [passwords, setPasswords] = useState([]);

//   useEffect(() => {
//     const fetchPasswords = async () => {
//       try {
//         const email = localStorage.getItem('email');
//         const response = await axiosInstance.get(`/api/auth/getPasswords?email=${email}`);
//         setPasswords(response.data);
//       } catch (error) {
//         console.log(error);
//         toast.error("Something went wrong");
//       }
//     };
//     fetchPasswords();
//   }, []);

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
    toast.success('Password copied to clipboard!');
  };

  return (
    <>
        <section className="bg-gray-50 dark:bg-gray-900 ">
      

      <button data-modal-target="password-modal" data-modal-toggle="password-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        Show Saved Passwords
      </button>

      <div id="password-modal" tabindex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Saved Passwords
              </h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="password-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <p className="text-gray-500 dark:text-gray-400 mb-4">Select a password to copy:</p>
              <ul className="space-y-4 mb-4">
                {passwords.map((password, index) => (
                  <li key={index} className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-lg dark:bg-gray-600 dark:border-gray-500">
                    <div className="block">
                      <div className="w-full text-lg font-semibold text-gray-900 dark:text-white">Password {index + 1}</div>
                      <div className="w-full text-gray-500 dark:text-gray-400">{password}</div>
                    </div>
                    <FaCopy
                      onClick={() => copyToClipboard(password)}
                      className="w-4 h-4 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
                    />
                  </li>
                ))}
              </ul>
              <button className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default ShowSavedPasswords;
