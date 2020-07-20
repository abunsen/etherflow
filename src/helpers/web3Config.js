const ethersTemplate = (methodCall, varName, url) => {
  return `const ethers = require("ethers");
// OR import ethers from 'ethers';

// HTTP version
(async () => {
  const provider = new ethers.providers.JsonRpcProvider('${url}');
  const ${varName} = await provider.${methodCall};
  console.log(${varName});
})()


// WebSocket version
(async () => {
  const provider = new ethers.providers.WebSocketProvider('${url}');
  const ${varName} = await provider.${methodCall};
  console.log(${varName});
})()
`;
};

const Web3RpcCalls = {
  web3_clientVersion: {
    description: 'Returns the current client version.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('web3_clientVersion');
      },
      codeSample: (url, ...args) => {
        return ethersTemplate("send('web3_clientVersion')", 'version', url);
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
    description:
      'Returns Keccak-256 (not the standardized SHA3-256) of the given data.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('web3_sha3', [args[0]]);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(`send('web3_sha3', ['${args[0]}'])`, 'hash', url);
      },
      args: [
        {
          type: 'textarea',
          description: 'The hexified data to convert into a SHA3 hash',
          placeholder: 'i.e. 0x68656c6c6f20776f726c64',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  net_version: {
    description: 'Returns the current network id.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.getNetwork();
      },
      codeSample: (url, ...args) => {
        return ethersTemplate('getNetwork()', 'network', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  net_listening: {
    description:
      'Returns `true` if client is actively listening for network connections.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('net_listening');
      },
      codeSample: (url, ...args) => {
        return ethersTemplate("send('net_listening')", 'listening', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  net_peerCount: {
    description: 'Returns number of peers currently connected to the client.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('net_peerCount');
      },
      codeSample: (url, ...args) => {
        return ethersTemplate("send('net_peerCount')", 'peers', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_protocolVersion: {
    description: 'Returns the current ethereum protocol version.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_protocolVersion');
      },
      codeSample: (url, ...args) => {
        return ethersTemplate("send('eth_protocolVersion')", 'version', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_syncing: {
    description: 'Returns an object with data about the sync status or false.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_syncing');
      },
      codeSample: (url, ...args) => {
        return ethersTemplate("send('eth_syncing')", 'isSyncing', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_coinbase: {
    description: 'Returns the client coinbase address.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_coinbase');
      },
      codeSample: (url, ...args) => {
        return ethersTemplate("send('eth_coinbase')", 'coinbase', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_mining: {
    description: 'Returns `true` if client is actively mining new blocks.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_mining');
      },
      codeSample: (url, ...args) => {
        return ethersTemplate("send('eth_mining')", 'isMining', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_hashrate: {
    description:
      'Returns the number of hashes per second that the node is mining with.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_hashrate');
      },
      codeSample: (url, ...args) => {
        return ethersTemplate("send('eth_hashrate')", 'hashRate', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_gasPrice: {
    description: 'Returns the current price per gas in wei.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.getGasPrice();
      },
      codeSample: (url, ...args) => {
        return ethersTemplate('getGasPrice()', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_accounts: {
    description: 'Returns a list of addresses owned by client.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_accounts');
      },
      codeSample: (url, ...args) => {
        return ethersTemplate("send('eth_accounts')", 'accts', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_blockNumber: {
    description: 'Returns the number of most recent block.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.getBlockNumber();
      },
      codeSample: (url, ...args) => {
        return ethersTemplate('getBlockNumber()', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getBalance: {
    description: 'Returns the balance of the account of given address.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.getBalance(...args);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `getBalance('${args[0]}', '${args[1]}')`,
          'balance',
          url
        );
      },
      args: [
        {
          type: 'textarea',
          description: 'Address to check for balance',
          placeholder: 'i.e. 0x91b51c173a4...',
        },
        {
          type: 'textfield',
          description:
            'Hex block number, or the string "latest", "earliest" or "pending"',
          placeholder: 'i.e. latest or pending',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getStorageAt: {
    description:
      'Returns the value from a storage position at a given address.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.getStorageAt(...args);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `getStorageAt('${args[0]}', '${args[1]}', '${args[2]}')`,
          'storage',
          url
        );
      },
      args: [
        {
          type: 'textarea',
          description: 'Address of the storage',
          placeholder: 'i.e. 0x91b51c173a4... or ENS domain',
        },
        {
          type: 'textfield',
          description: 'Hex of the position in the storage',
          placeholder: 'i.e. 0x0, 0x1, 0x2...',
        },
        {
          type: 'textfield',
          description:
            'Hex block number, or the string "latest", "earliest" or "pending"',
          placeholder: 'i.e. latest or pending',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getTransactionCount: {
    description: 'Returns the number of transactions sent from an address.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.getTransactionCount(...args);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `getTransactionCount('${args[0]}', '${args[1]}')`,
          'txCount',
          url
        );
      },
      args: [
        {
          type: 'textarea',
          description: 'Address to check for balance',
          placeholder: 'i.e. 0x91b51c173a4...',
        },
        {
          type: 'textfield',
          description:
            'Hex block number, or the string "latest", "earliest" or "pending"',
          placeholder: 'i.e. latest or pending',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getBlockTransactionCountByHash: {
    description:
      'Returns the number of transactions in a block from a block matching the given block hash.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_getBlockTransactionCountByHash', [args[0]]);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `send('eth_getBlockTransactionCountByHash', ['${args[0]}'])`,
          'txCount',
          url
        );
      },
      args: [
        {
          type: 'textarea',
          description: 'Hash of a block to get transaction count from',
          placeholder: 'i.e. 0x16c4e370736...',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getBlockTransactionCountByNumber: {
    description:
      'Returns the number of transactions in a block matching the given block number.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_getBlockTransactionCountByNumber', [args[0]]);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `send('eth_getBlockTransactionCountByNumber', ['${args[0]}'])`,
          'txCount',
          url
        );
      },
      args: [
        {
          type: 'textarea',
          description: 'Hex of a block to get transaction count from',
          placeholder: 'i.e. 0x9C6EFE',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getUncleCountByBlockHash: {
    description:
      'Returns the number of uncles in a block from a block matching the given block hash.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_getUncleCountByBlockHash', [args[0]]);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `send('eth_getUncleCountByBlockHash', ['${args[0]}'])`,
          'uncleCount',
          url
        );
      },
      args: [
        {
          type: 'textarea',
          description: 'Hash of a block to get uncle count from',
          placeholder: 'i.e. 0x16c4e370736...',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getUncleCountByBlockNumber: {
    description:
      'Returns the number of uncles in a block from a block matching the given block number.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_getUncleCountByBlockNumber', [args[0]]);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `send('eth_getUncleCountByBlockNumber', ['${args[0]}'])`,
          'uncleCount',
          url
        );
      },
      args: [
        {
          type: 'textarea',
          description: 'Hex of a block to get uncle count from',
          placeholder: 'i.e. 0x9C6EFE',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getCode: {
    description: 'Returns code at a given address.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.getCode(...args);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `getCode('${args[0]}', '${args[1]}')`,
          'code',
          url
        );
      },
      args: [
        {
          type: 'textarea',
          description: 'Address to fetch code from',
          placeholder: 'i.e. 0x91b51c173a4...',
        },
        {
          type: 'textfield',
          description:
            'Hex block number, or the string "latest", "earliest" or "pending"',
          placeholder: 'i.e. latest or pending',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_sign: {
    description: '🚫 This method is not supported in EtherFlow!',
    ethers: {
      exec: (provider, proto, ...args) => {
        return new Promise((resolve, reject) =>
          reject('EtherFlow does not support this method.')
        );
      },
      codeSample: (url, ...args) => {
        return '/* Not Supported by EtherFlow */';
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {
        return new Promise((resolve, reject) =>
          reject('EtherFlow does not support this method.')
        );
      },
      codeSample: (url, ...args) => {
        return '/* Not Supported by EtherFlow */';
      },
      args: [],
    },
  },
  eth_signTransaction: {
    description: '🚫 This method is not supported in EtherFlow!',
    ethers: {
      exec: (provider, proto, ...args) => {
        return new Promise((resolve, reject) =>
          reject('EtherFlow does not support this method.')
        );
      },
      codeSample: (url, ...args) => {
        return '/* Not Supported by EtherFlow */';
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {
        return new Promise((resolve, reject) =>
          reject('EtherFlow does not support this method.')
        );
      },
      codeSample: (url, ...args) => {
        return '/* Not Supported by EtherFlow */';
      },
      args: [],
    },
  },
  eth_sendTransaction: {
    description: '🚫 This method is not supported in EtherFlow!',
    ethers: {
      exec: (provider, proto, ...args) => {
        return new Promise((resolve, reject) =>
          reject('EtherFlow does not support this method.')
        );
      },
      codeSample: (url, ...args) => {
        return '/* Not Supported by EtherFlow */';
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {
        return new Promise((resolve, reject) =>
          reject('EtherFlow does not support this method.')
        );
      },
      codeSample: (url, ...args) => {
        return '/* Not Supported by EtherFlow */';
      },
      args: [],
    },
  },
  eth_sendRawTransaction: {
    description:
      'Creates new message call transaction or a contract creation for signed transactions.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.sendTransaction(...args);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(`sendTransaction('${args[0]}')`, 'tx', url);
      },
      args: [
        {
          type: 'textarea',
          description: 'The previously signed transaction data',
          placeholder:
            'i.e. 0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
        },
      ],
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
    description: 'Returns information about a block by hash.',
    ethers: {
      exec: (provider, proto, ...args) => {
        if (args[1] === 'true') {
          return provider.getBlockWithTransactions(args[0]);
        } else {
          return provider.getBlock(args[0]);
        }
      },
      codeSample: (url, ...args) => {
        if (args[1] === 'true') {
          return ethersTemplate(
            `getBlockWithTransactions('${args[0]}')`,
            'blockData',
            url
          );
        } else {
          return ethersTemplate(`getBlock('${args[0]}')`, 'blockData', url);
        }
      },
      args: [
        {
          type: 'textarea',
          description: 'Hash of a block to get information from',
          placeholder: 'i.e. 0x16c4e370736...',
        },
        {
          type: 'boolean',
          description: 'Should we return full transaction objects?',
          placeholder: '',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getBlockByNumber: {
    description: 'Returns information about a block by block number.',
    ethers: {
      exec: (provider, proto, ...args) => {
        if (args[1] === 'true') {
          return provider.getBlockWithTransactions(args[0]);
        } else {
          return provider.getBlock(args[0]);
        }
      },
      codeSample: (url, ...args) => {
        if (args[1] === 'true') {
          return ethersTemplate(
            `getBlockWithTransactions('${args[0]}')`,
            'blockData',
            url
          );
        } else {
          return ethersTemplate(`getBlock('${args[0]}')`, 'blockData', url);
        }
      },
      args: [
        {
          type: 'textarea',
          description: 'Hex of a block number to get information from',
          placeholder: 'i.e. 0x9C6EFE',
        },
        {
          type: 'boolean',
          description: 'Should we return full transaction objects?',
          placeholder: '',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getTransactionByHash: {
    description:
      'Returns the information about a transaction requested by transaction hash.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.waitForTransaction(...args);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `waitForTransaction('${args[0]}')`,
          'txInfo',
          url
        );
      },
      args: [
        {
          type: 'textarea',
          description: 'Hash of a transaction to get information for',
          placeholder:
            'i.e. 0x95575ee5f6cdb3907cd2983516f33828855ed4f12320103dc8524b96a5a5414b',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getTransactionByBlockHashAndIndex: {
    description:
      'Returns information about a transaction by block hash and transaction index position.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_getTransactionByBlockHashAndIndex', [
          ...args,
        ]);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `send('eth_getTransactionByBlockHashAndIndex', ['${args[0]}', '${args[1]}'])`,
          'txInfo',
          url
        );
      },
      args: [
        {
          type: 'textarea',
          description: 'Hash of a block to get information from',
          placeholder: 'i.e. 0x16c4e370736...',
        },
        {
          type: 'textfield',
          description: 'Hex of tx position in the block',
          placeholder: 'i.e. 0x0, 0x1, 0x2...',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getTransactionByBlockNumberAndIndex: {
    description:
      'Returns information about a transaction by block number and transaction index position.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_getTransactionByBlockNumberAndIndex', [
          ...args,
        ]);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `send('eth_getTransactionByBlockNumberAndIndex', ['${args[0]}', '${args[1]}'])`,
          'txInfo',
          url
        );
      },
      args: [
        {
          type: 'textfield',
          description:
            'Hex block number, or the string "latest", "earliest" or "pending"',
          placeholder: 'i.e. latest or pending',
        },
        {
          type: 'textfield',
          description: 'Hex of tx position in the block',
          placeholder: 'i.e. 0x0, 0x1, 0x2...',
        },
      ],
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
