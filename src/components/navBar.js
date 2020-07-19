import React from 'react';

const NavBar = ({ web3URL, setWeb3URL }) => {
  return (
    <nav className="bg-gray-800">
      <div className="w-full mx-auto px-2 sm:px-4 lg:px-8">
        <div className="relative flex items-center justify-between h-16  w-full">
          <div className="flex items-center px-2 lg:px-0 w-full">
            <div className="flex-shrink-0 text-white font-bold">EtherFlow</div>
            <div className="hidden lg:block lg:ml-6 w-full">
              <div className="flex">
                <div className="w-full">
                  <label htmlFor="search" className="sr-only">
                    Node URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="-ml-1 mr-2 h-5 w-5 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      id="search"
                      className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150 ease-in-out"
                      placeholder="Enter Node URL. Ex: https://plush-dusk-skies.quiknode.pro/098ahwfaz..."
                      type="text"
                      defaultValue={web3URL}
                      onChange={(e) => setWeb3URL(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { NavBar };
