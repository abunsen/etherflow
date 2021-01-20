import { ethers } from 'ethers';
import Web3 from 'web3';

export default (web3Lib, web3URL) => {
  let provider;
  const proto = web3URL.startsWith('wss') ? 'wss' : 'https';
  if (web3Lib === 'ethers') {
    provider =
      proto === 'wss'
        ? new ethers.providers.WebSocketProvider(web3URL)
        : new ethers.providers.JsonRpcProvider(web3URL);
  } else if (web3Lib === 'web3') {
    provider = new Web3(web3URL);
  }

  return [provider, proto];
};
