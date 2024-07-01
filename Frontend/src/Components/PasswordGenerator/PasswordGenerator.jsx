


import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaCopy } from 'react-icons/fa'; // Importing the copy icon from react-icons
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../config/axiosConfig';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(4);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const generatePassword = () => {
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let characterList = '';

    if (includeUppercase) {
      characterList += upperCaseChars;
    }
    if (includeLowercase) {
      characterList += lowerCaseChars;
    }
    if (includeNumbers) {
      characterList += numberChars;
    }
    if (includeSymbols) {
      characterList += symbolChars;
    }

    if (!characterList) {
      toast.error('Please select at least one option');
      return;
    }

    let password = '';
    const characterListLength = characterList.length;

    for (let i = 0; i < length; i++) {
      const characterIndex = Math.floor(Math.random() * characterListLength);
      password += characterList.charAt(characterIndex);
    }

    setPassword(password);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      toast.success('Password copied to clipboard!');
    } else {
      toast.error('No password to copy');
    }
  };

  const calculateStrength = () => {
    let strength = 0;
    if (includeUppercase) strength += 1;
    if (includeLowercase) strength += 1;
    if (includeNumbers) strength += 1;
    if (includeSymbols) strength += 1;
    if (length > 8) strength += 1;

    switch (strength) {
      case 1:
        return 'Poor';
      case 2:
        return 'Weak';
      case 3:
        return 'Medium';
      case 4:
        return 'Strong';
      case 5:
        return 'Very Strong';
      default:
        return 'Poor';
    }
  };
  const savePassword= async(password)=>{

    const email = localStorage.getItem('email');
    console.log(email); 
   try {
    const data={
      password:password,
      email:email

    }
    console.log(data,"dataaaaa");
    const response= await axiosInstance.post('/api/auth/savePassword',data)
    console.log(response,"response in password generator ");
    if (response.data){
        toast.success("Password saved success")
        setPassword('')
    }else{
      toast.error('Paasword saving failed')
    }
   } catch (error) {
    console.log(error)
    toast.error("Something went wrong")
   }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-900 dark:text-white">
          PASSWORD GENERATOR
        </h2>
        <div className="relative mb-4">
          <input
            type="text"
            readOnly
            value={password}
            className="w-full p-2 mb-2 text-center bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Generated Password"
          />
          <FaCopy
            onClick={copyToClipboard}
            className="absolute right-2 top-2 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          />
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Strength: <span className="font-bold">{calculateStrength()}</span>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="length" className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Length: {length}
          </label>
          <input
            type="range"
            id="length"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="uppercase"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="uppercase" className="text-sm font-medium text-gray-900 dark:text-white">
              Uppercase
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="lowercase"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="lowercase" className="text-sm font-medium text-gray-900 dark:text-white">
              Lowercase
            </label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="numbers"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="numbers" className="text-sm font-medium text-gray-900 dark:text-white">
              Numbers
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="symbols"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="symbols" className="text-sm font-medium text-gray-900 dark:text-white">
              Symbols
            </label>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={generatePassword}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Generate Password
          </button>
          <button 
          onClick={() => savePassword(password)}
            className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Save Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
