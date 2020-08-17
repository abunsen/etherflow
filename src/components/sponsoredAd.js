import React from 'react';

const SponsoredAd = ({ visible, setSponsorVisible }) => {
  const classes = `${
    visible ? '' : 'hidden'
  } fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end`;
  /* eslint-disable react/jsx-no-target-blank */

  return (
    <div className={classes}>
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto absolute bottom-6">
        <div className="rounded-lg shadow-xs">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://pbs.twimg.com/profile_images/880519774798835712/qzz95hUu_400x400.jpg"
                  alt=""
                />
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm leading-5 font-medium text-gray-900">
                  Sponsored by QuikNode
                </p>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  Huge thanks to QuikNode for letting us build EtherFlow with{' '}
                  <span role="img" aria-label="lightning">
                    ⚡️
                  </span>{' '}
                  fast nodes.
                </p>
                <div className="mt-4 flex">
                  <span className="inline-flex rounded-md shadow-sm">
                    <a
                      href="https://quiknode.io/?utm_source=etherflow"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                      target="_blank"
                      rel="noopener"
                    >
                      Visit QuikNode
                    </a>
                  </span>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                  onClick={() => setSponsorVisible(false)}
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SponsoredAd };
