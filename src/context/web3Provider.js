import React, { createContext, useState } from 'react';
// import ethers from 'ethers';

const Web3Context = createContext({});

const Web3Provider = ({ children }) => {
  const [providerObject, setProviderObject] = useState(null);
  // bundle it up for use
  const web3ContextObject = {
    providerObject,
    setProviderObject,
  };

  return (
    <Web3Context.Provider value={web3ContextObject}>
      {children}
    </Web3Context.Provider>
  );
};

export { Web3Context, Web3Provider };
