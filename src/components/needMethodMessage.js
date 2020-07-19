import React from 'react';

const NeedMethodMessage = () => {
  return (
    <div>
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-4">
        Please select a method from the list
      </h2>
      <hr className="my-2" />
      <p className="text-xs mb-3">
        Select a method from the list on the left and this pane will populate
        with a description and potential arguments.
      </p>
    </div>
  );
};

export { NeedMethodMessage };
