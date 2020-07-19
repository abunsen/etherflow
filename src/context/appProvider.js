import React, { createContext, useEffect, useState } from 'react';
import { Hook, Unhook } from 'console-feed';

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  // should we be showing the sponsor?
  const [sponsorVisible, setSponsorVisible] = useState(false);
  // should we be showing the code sample?
  const [codeSampleVisible, setCodeSampleVisible] = useState(false);
  const toggleSampleCode = () => {
    setCodeSampleVisible(!codeSampleVisible);
  };
  // logs
  const [logs, setLogs] = useState([]);
  const addToLog = (log) => setLogs((currLogs) => [...currLogs, log]);
  // bundle it up for use
  const contextObject = {
    logs,
    setLogs,
    sponsorVisible,
    setSponsorVisible,
    codeSampleVisible,
    toggleSampleCode,
    addToLog,
  };

  // run once!
  useEffect(() => {
    Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    return () => Unhook(window.console);
  }, []);

  return (
    <AppContext.Provider value={contextObject}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
