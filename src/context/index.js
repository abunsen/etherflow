import React from 'react';
import { AppContext, AppProvider } from './appProvider';
import { LogContext, LogProvider } from './logProvider';
import { Web3Context, Web3Provider } from './web3Provider';

const WrappedProvider = ({ children }) => {
  return (
    <AppProvider>
      <LogProvider>
        <Web3Provider>{children}</Web3Provider>
      </LogProvider>
    </AppProvider>
  );
};

export { WrappedProvider as AppProvider, AppContext, LogContext, Web3Context };
