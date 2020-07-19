import React from 'react';

const StatusBar = ({ httpConnects, wssConnects, lastBlock, web3Version }) => {
  const nulls = [undefined, null];
  const httpColor = nulls.includes(httpConnects)
    ? 'gray'
    : httpConnects
    ? 'green'
    : 'red';
  const wssColor = nulls.includes(wssConnects)
    ? 'gray'
    : wssConnects
    ? 'green'
    : 'red';

  return (
    <header className="bg-white border-b border-gray-300 shadow-sm">
      <div className="w-full flex mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="pr-2 mr-1">
          <span
            className={`align-middle inline-block h-2 w-2 rounded-full text-white bg-${httpColor}-400`}
          ></span>{' '}
          <span className="text-sm">Node connects via HTTP</span>
        </div>

        <div className="px-2 mx-1">
          <span
            className={`align-middle inline-block h-2 w-2 rounded-full text-white bg-${wssColor}-400`}
          ></span>{' '}
          <span className="text-sm">Node connects via WebSocket</span>
        </div>

        <div className="px-2 mx-1">
          <svg
            className="flex-shrink-0 mr-1 h-4 w-4 text-gray-500 inline-block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
            <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
          </svg>
          <span className="text-sm">
            {lastBlock
              ? `Last reported block: ${lastBlock}`
              : 'Unknown block number'}
          </span>
        </div>

        <div className="px-2 mx-1">
          <svg
            className="flex-shrink-0 mr-1 h-4 w-4 text-gray-500 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
          <span className="text-sm">{web3Version || 'Unknown'}</span>
        </div>
      </div>
    </header>
  );
};

export { StatusBar };
