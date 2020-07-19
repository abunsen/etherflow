const Web3RpcCalls = {
  web3_clientVersion: {
    description: 'Returns the current client version.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('web3_clientVersion');
      },
      codeSample: (url, ...args) => {
        return `const ethers = require("ethers");
// OR import ethers from 'ethers';

// HTTP version
(async () => {
  const provider = new ethers.providers.JsonRpcProvider('${url}');
  const version = await provider.send('web3_clientVersion');
  console.log(version);
})()


// WebSocket version
(async () => {
  const provider = new ethers.providers.WebSocketProvider('${url}');
  const version = await provider.send('web3_clientVersion');
  console.log(version);
})()
`;
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  web3_sha3: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  net_version: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  net_peerCount: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  net_listening: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_protocolVersion: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_syncing: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_coinbase: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_mining: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_hashrate: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_gasPrice: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_accounts: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_blockNumber: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getBalance: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getStorageAt: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getTransactionCount: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getBlockTransactionCountByHash: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getBlockTransactionCountByNumber: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getUncleCountByBlockHash: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getUncleCountByBlockNumber: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getCode: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_sign: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_signTransaction: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_sendTransaction: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_sendRawTransaction: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_call: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_estimateGas: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getBlockByHash: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getBlockByNumber: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getTransactionByHash: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getTransactionByBlockHashAndIndex: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getTransactionByBlockNumberAndIndex: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getTransactionReceipt: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getUncleByBlockHashAndIndex: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getUncleByBlockNumberAndIndex: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getCompilers: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_compileLLL: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_compileSolidity: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_compileSerpent: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_newFilter: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_newBlockFilter: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_newPendingTransactionFilter: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_uninstallFilter: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getFilterChanges: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getFilterLogs: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getLogs: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getWork: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_submitWork: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_submitHashrate: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  db_putString: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  db_getString: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  db_putHex: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  db_getHex: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  shh_post: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  shh_version: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  shh_newIdentity: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  shh_hasIdentity: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  shh_newGroup: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  shh_addToGroup: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  shh_newFilter: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  shh_uninstallFilter: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  shh_getFilterChanges: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  shh_getMessages: {
    description: '',
    ethers: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
};

export default Web3RpcCalls;
