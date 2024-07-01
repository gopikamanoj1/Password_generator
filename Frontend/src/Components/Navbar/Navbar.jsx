
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCopy } from 'react-icons/fa';
import axiosInstance from '../../config/axiosConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const token = localStorage.getItem('token');
  console.log(token, "ooo");

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('data');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const showSavedPasswords = async () => {
    try {
      const email = localStorage.getItem('email');
      const data = { email: email };
      const response = await axiosInstance.post('/api/auth/getPasswords', data);
      console.log(response, "saved passwords ");
      setPasswords(response.data.data); // Accessing the data property
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
    toast.success('Password copied to clipboard!');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="bg-white border-gray-200  dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSflPBKHdaRdEkEQ7_jXScXHsxyO-1RUg3wAQ&s" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Password-generator</span>
          </a>
          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {token && token !== undefined || null ? (
                <>
                  <li>
                    <button onClick={showSavedPasswords} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Saved Passwords</button>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to='/login' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
                  </li>
                  <li>
                    <Link to='/register' className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sign up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {isModalOpen && (
        <div id="password-modal" className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Saved Passwords
                </h3>
                <button type="button" onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
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
                        <div className="w-full text-lg font-semibold text-gray-500 dark:text-gray-400 ">Password {index + 1}</div>
                        <div className="w-full  dark:text-white">{password.password}</div>
                      </div>
                      <FaCopy
                        onClick={() => copyToClipboard(password.password)}
                        className="w-4 h-4 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
                      />
                    </li>
                  ))}
                </ul>
                <button onClick={closeModal} className="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;


