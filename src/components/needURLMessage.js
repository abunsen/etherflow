import React from 'react';

const NeedURLMessage = () => {
  return (
    <div>
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4">
        Please ENTER a Web3 URL in the nav bar
      </h2>
      <hr className="my-2" />
      <p className="text-xs mb-3">
        We need you to drop a Web3 URL in the input field at the top before we
        can do anything meaningful.
      </p>
    </div>
  );
};

export { NeedURLMessage };
