import React from 'react';

const NeedLibMessage = () => {
  return (
    <div className="py-2">
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4">
        Please select a library{' '}
        <span role="img" aria-label="Pointing up">
          ☝🏽
        </span>
      </h2>
      <hr className="my-2" />
      <p className="text-xs mb-3">
        Select a web3 library and this area will populate with a list of support
        RPC methods for you to choose from.
      </p>
    </div>
  );
};

export { NeedLibMessage };
