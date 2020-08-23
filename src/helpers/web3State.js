import ethers from 'ethers';

const web3State = async (url) => {
  if (!url) {
    return {
      web3Version: 'Unknown',
      lastBlock: 0,
      wssConnects: null,
      httpConnects: null,
    };
  }

  // try WSS connection
  let sockConnect, httpConnect, blockNum, version;
  try {
    const sock = new WebSocket(url);
    sock.onopen = () => sock.send('test');
    const provider = new ethers.providers.WebSocketProvider(url);
    blockNum = await provider.getBlockNumber();
    version = await provider.send('web3_clientVersion');
    sockConnect = true;
  } catch (e) {
    sockConnect = false;
  }
  // try HTTP connection
  try {
    fetch(url)
      .then(() => (httpConnect = true))
      .catch(() => (httpConnect = false));
    const provider = new ethers.providers.JsonRpcProvider(url);
    blockNum = await provider.getBlockNumber();
    version = await provider.send('web3_clientVersion');
    httpConnect = true;
  } catch (e) {
    httpConnect = false;
  }

  return {
    web3Version: `${version?.split('/')[0].replace('/', '')} ${
      version?.split('/')[1]?.split('-')[0]
    }`,
    lastBlock: blockNum,
    wssConnects: sockConnect,
    httpConnects: httpConnect,
  };
};

export default web3State;
