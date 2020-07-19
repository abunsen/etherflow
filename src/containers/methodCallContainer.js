import React, { useContext } from 'react';
import { NeedURLMessage, MethodCall } from '../components';
import { AppContext } from '../context';
import { useParams } from '@reach/router';

const MethodCallContainer = () => {
  const params = useParams();
  const { sampleCodeVisible, toggleSampleCode } = useContext(AppContext);
  const { web3URL = '', web3Lib = '', currentMethod = '' } = params;
  const contextProps = {
    sampleCodeVisible,
    toggleSampleCode,
    currentMethod,
    web3Lib,
    web3URL,
  };

  if (!web3URL) {
    return (
      <div className="w-3/12 py-2 px-4 border-r border-gray-200 shadow-md h-screen">
        <NeedURLMessage />
      </div>
    );
  }
  if (!currentMethod) {
    return (
      <div className="w-3/12 py-2 px-4 border-r border-gray-200 shadow-md h-screen">
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
  }

  return <MethodCall {...contextProps} />;
};

export { MethodCallContainer };
