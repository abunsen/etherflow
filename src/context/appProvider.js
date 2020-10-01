import React, { createContext, useCallback, useState } from 'react';

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  // should we be showing the code sample?
  const [codeSampleVisible, setCodeSampleVisible] = useState(false);
  const toggleSampleCode = useCallback(() => {
    setCodeSampleVisible(!codeSampleVisible);
  }, [codeSampleVisible]);
  const [abi, setAbi] = useState(null);

  return (
    <AppContext.Provider
      value={{
        codeSampleVisible,
        toggleSampleCode,
        abi,
        setAbi,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
