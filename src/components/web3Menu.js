import React from 'react';
import { MethodList } from './methodList';

const Web3Menu = ({ web3URL, web3Lib, setWeb3Lib }) => {
  return (
    <div className="w-3/12 py-2 px-4 border-r border-gray-200 shadow-md h-screen overflow-hidden">
      <div>
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">
          Web3 library
        </h2>
        <select
          defaultValue={web3Lib || ''}
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

        <MethodList web3URL={web3URL} web3Lib={web3Lib} />
      </div>
    </div>
  );
};

export { Web3Menu };
