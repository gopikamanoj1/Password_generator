






import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCopy, FaTrash, FaEdit } from 'react-icons/fa';
import axiosInstance from '../../config/axiosConfig';
import DeleteAlert from './DeleteAlert';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for showing saved passwords modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for showing edit password modal
  const [passwords, setPasswords] = useState([]);
  const [editingPassword, setEditingPassword] = useState(null);
  
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
      setPasswords(response.data.data);
      setIsModalOpen(true);
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

  const handleDelete = async (passwordId) => {
    if (window.confirm("Are you sure you want to delete this password?")) {

      try {
    
        const data={
          passwordId:passwordId
        }
        console.log(data,"ffffffffffffffffffffff");
        const response = await axiosInstance.post('/api/auth/deletePassword',data);
        console.log(response, "deleted password");
        // setPasswords(passwords.filter(password => password._id !== passwordId));
        showSavedPasswords()
        toast.success("Password deleted successfully");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete password");
      }
    }
  };

  const handleEdit = (passwordId) => {
    const passwordToEdit = passwords.find((password) => password._id === passwordId);
    console.log(passwordId,"ooo")
    setEditingPassword(passwordToEdit);
    console.log(passwordToEdit.password,"ppp");
    
    setIsEditModalOpen(true); // Open the edit modal
        


  };

  const closeEditModal = () => {
    setEditingPassword(null);
    setIsEditModalOpen(false); // Close the edit modal
  };

  const saveEditedPassword = async (editedPassword) => {
    try {
      const {email, password, _id}=editedPassword
     const data={
      email:email,
      password:password,
      _id:_id
      }
      console.log(data,"odataaa");
      const response = await axiosInstance.put('/api/auth/editPasswords', data);
      if (response.data) {
        toast.success('Password updated successfully');
        showSavedPasswords()
        closeEditModal();
      } else {
        toast.error('Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password');
    }
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
                {passwords.length == 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No passwords saved.</p>

                ) : (
                  <ul className="space-y-4 mb-4">

                    {passwords.map((password, index) => (
                      <li key={index} className="flex items-center justify-between p-5 bg-white border border-gray-200 rounded-lg  dark:border-gray-500">
                        <div className="block">
                          <div className="w-full text-base font-medium text-gray-500 dark:text-gray-400 ">Password {index + 1}</div>
                          <div className="w-full dark:text-black font-extrabold">{password.password}</div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button onClick={() => copyToClipboard(password.password)} className="p-2 hover:bg-gray-300 rounded-lg  text-sky-700  hover:text-sky-700 dark:hover:text-sky-500" title="Copy Password"
                          >
                            <FaCopy className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleEdit(password._id)} className="p-2 hover:bg-gray-300 rounded-lg  text-green-700 hover:text-green-500 dark:hover:text-green-500" title="Edit Password"
                          >
                            <FaEdit className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete(password._id)} className="p-2 hover:bg-gray-300 rounded-lg  text-red-700 hover:text-red-500 dark:hover:text-red-500" title="Delete Password"
                          >
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )
                }

              </div>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div id="edit-password-modal" className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Edit Password
                </h3>
                <button type="button" onClick={closeEditModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  saveEditedPassword(editingPassword);
                }}>
                  <div className="mb-4">
                    <label htmlFor="edit-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </label>
                    <input
                      type="text"
                      id="edit-password"
                      name="password"
                      value={editingPassword.password}
                      onChange={(e) => setEditingPassword({ ...editingPassword, password: e.target.value })}
                      
                      className="mt-1 block w-full px-3 py-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button type="button" onClick={closeEditModal} className="mr-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                      Cancel
                    </button>
                    <button type="submit" className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
