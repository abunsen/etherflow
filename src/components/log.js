import React from 'react';
import { Console } from 'console-feed';

const Logs = ({ logs }) => {
  return (
    <div className="w-6/12 py-2 px-4 shadow-md h-screen overflow-y-scroll text-xs bg-black">
      <h2 className="text-gray-400 text-xs font-medium uppercase tracking-wide mb-3">
        Logs
      </h2>
      <div className="text-gray-200">
        <Console logs={logs} filter={['log', 'error', 'info']} variant="dark" />
      </div>
    </div>
  );
};

export { Logs };
