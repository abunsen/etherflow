import React, { createContext, useEffect, useState } from 'react';
import { Hook, Unhook } from 'console-feed';

const LogContext = createContext({});

const LogProvider = ({ children }) => {
  // logs
  const [logs, setLogs] = useState([]);
  const addToLog = (log) => setLogs((currLogs) => [...currLogs, log]);
  // bundle it up for use
  const contextObject = {
    logs,
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
    <LogContext.Provider value={contextObject}>{children}</LogContext.Provider>
  );
};

export { LogContext, LogProvider };
