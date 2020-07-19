import React from 'react';
import { NavBar } from '../components';
import { navigate, useParams } from '@reach/router';

const NavBarContainer = () => {
  const params = useParams();
  const web3URL = atob(params.web3URL || '');
  const setWeb3URL = (url) => {
    const b64url = btoa(url);
    navigate(`/${b64url}`);
  };

  return <NavBar setWeb3URL={setWeb3URL} web3URL={web3URL} />;
};

export { NavBarContainer };
