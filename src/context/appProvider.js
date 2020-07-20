import React, { createContext, useCallback, useState } from 'react';

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  // should we be showing the code sample?
  const [codeSampleVisible, setCodeSampleVisible] = useState(false);
  // args to send into code sample, etc
  const [argumentList, setArgumentList] = useState([]);
  const toggleSampleCode = useCallback(() => {
    setCodeSampleVisible(!codeSampleVisible);
  }, [codeSampleVisible]);

  return (
    <AppContext.Provider
      value={{
        codeSampleVisible,
        toggleSampleCode,
        argumentList,
        setArgumentList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
