import React, { useEffect, useState } from 'react';
import { StatusBar } from '../components';
import { useParams } from '@reach/router';
import web3State from '../helpers/web3State';

const StatusBarContainer = () => {
  const params = useParams();
  const web3URL = params.web3URL || '';
  const [statusInfo, setStatusInfo] = useState({});
  useEffect(() => {
    let isMounted = true;
    web3State(atob(web3URL)).then((data) => {
      if (isMounted) setStatusInfo(data);
    });
    return () => {
      isMounted = false;
    };
  }, [web3URL]);

  return <StatusBar {...statusInfo} />;
};

export { StatusBarContainer };
