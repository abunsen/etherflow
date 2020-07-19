import React from 'react';
import { Link } from '@reach/router';
import { NeedLibMessage } from './needLibMessage';
import Web3RpcCalls from '../helpers/web3Config';

const MethodItem = ({ index, methodName, web3URL, web3Lib }) => {
  return (
    <li className={`${index === 0 ? '' : 'border-t border-gray-200'}`}>
      <Link
        to={`/${web3URL}/${web3Lib}/${methodName}`}
        className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
      >
        <div className="px-2 py-2 sm:px-3">
          <div className="flex items-center justify-between">
            <div className="text-sm leading-5 font-medium text-indigo-600 truncate">
              {methodName}
            </div>
            <div className="ml-2 flex-shrink-0 flex">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

const MethodList = ({ web3Lib, web3URL }) => {
  const methodList = Object.keys(Web3RpcCalls);
  if (!web3Lib) return <NeedLibMessage />;

  return (
    <div className="mt-3">
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4">
        Possible Methods
      </h2>
      <div className="h-screen overflow-x-scroll bg-white border-gray-200 border shadow sm:rounded-md">
        <ul className="">
          {methodList.map((key, i) => (
            <MethodItem
              key={key}
              methodName={key}
              index={i}
              web3URL={web3URL}
              web3Lib={web3Lib}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export { MethodList };
