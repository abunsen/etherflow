import React from 'react';
import { MethodList } from './methodList';

const Web3Menu = ({ web3URL, web3Lib, setWeb3Lib }) => {
  return (
    <div className="w-3/12 py-2 px-4 border-r border-gray-200 shadow-md h-screen overflow-hidden">
      <div>
        <label
          htmlFor="web3-lib"
          className="block text-sm leading-5 font-medium text-gray-700"
        >
          Web3 library
        </label>
        <select
          defaultValue={web3Lib || ''}
          id="web3-lib"
          className="my-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          onChange={(e) => setWeb3Lib(e.target.value)}
        >
          <option disabled value="">
            {' '}
            -- select an option --{' '}
          </option>
          <option value="web3">Web3.js</option>
          <option value="ethers">Ethers.js</option>
        </select>

        <div className="mt-3">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4">
            Possible Methods
          </h2>
          <div className="h-screen overflow-x-scroll bg-white border-gray-200 border shadow sm:rounded-md">
            <MethodList web3URL={web3URL} web3Lib={web3Lib} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Web3Menu };
