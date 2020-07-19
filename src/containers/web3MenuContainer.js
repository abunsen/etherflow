import React from 'react';
import { NeedURLMessage, Web3Menu } from '../components';
import { navigate, useParams } from '@reach/router';

const Web3MenuContainer = () => {
  const params = useParams();
  const { web3URL = '', web3Lib = '' } = params;
  const setWeb3Lib = (libName) => {
    navigate(`/${web3URL}/${libName}`);
  };
  const props = {
    web3URL: web3URL,
    web3Lib,
    setWeb3Lib,
  };

  if (!web3URL)
    return (
      <div className="w-3/12 py-2 px-4 border-r border-gray-200 shadow-md h-screen overflow-hidden">
        <NeedURLMessage />
      </div>
    );

  return <Web3Menu {...props} />;
};

export { Web3MenuContainer };
