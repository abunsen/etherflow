import React, { useContext, useEffect, useCallback } from 'react';
import { Logs } from '../components';
import { LogContext } from '../context';
import { useParams } from '@reach/router';

const LogsContainer = () => {
  const { logs, addToLog } = useContext(LogContext);
  const params = useParams();
  const web3URL = params.web3URL || null;
  const logItem = useCallback(addToLog, []);
  useEffect(() => {
    if (!web3URL) {
      logItem({
        method: 'info',
        data: ['⬆️ Please ENTER a Web3 URL in the nav bar'],
      });
    } else {
      logItem({
        method: 'info',
        data: ['⏳ Web3 URL detected...'],
      });
    }
  }, [logItem, web3URL]);

  return <Logs logs={logs} />;
};

export { LogsContainer };
