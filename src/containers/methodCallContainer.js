import React, { useContext } from 'react';
import { NeedMethodMessage, NeedURLMessage, MethodCall } from '../components';
import { AppContext } from '../context';
import { useParams } from '@reach/router';

const MethodCallContainer = () => {
  const params = useParams();
  const { codeSampleVisible, toggleSampleCode } = useContext(AppContext);
  const { web3URL = '', web3Lib = '', currentMethod = '' } = params;
  const contextProps = {
    codeSampleVisible,
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
        <NeedMethodMessage />
      </div>
    );
  }

  return <MethodCall {...contextProps} />;
};

export { MethodCallContainer };
