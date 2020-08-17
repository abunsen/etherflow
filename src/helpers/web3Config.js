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

const web3Template = (methodCall, varName, url) => {
  return `const Web3 = require("web3");
// OR Web3 ethers from 'web3';

// HTTP version
(async () => {
  const web3 = new Web3('${url}');
  const ${varName} = await web3.${methodCall};
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
      exec: (provider, proto, ...args) => {
        return provider.eth.getNodeInfo();
      },
      codeSample: (url, ...args) => {
        return web3Template('eth.getNodeInfo()', 'version', url);
      },
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
      exec: (provider, proto, ...args) => {
        return new Promise((resolve, reject) =>
          resolve(provider.utils.sha3(args[0], { encoding: 'hex' }))
        );
      },
      codeSample: (url, ...args) => {
        return web3Template(
          `utils.sha3('${args[0]}', { encoding: 'hex' })`,
          'hash',
          url
        );
      },
      args: [
        {
          type: 'textarea',
          description: 'The hexified data to convert into a SHA3 hash',
          placeholder: 'i.e. 0x68656c6c6f20776f726c64',
        },
      ],
    },
  },
  net_version: {
    description: 'Returns the current network id.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('net_version');
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(`send('net_version')`, 'network', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {
        return provider.eth.net.getId();
      },
      codeSample: (url, ...args) => {
        return web3Template(`eth.net.getId()`, 'network', url);
      },
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
      exec: (provider, proto, ...args) => {
        return provider.eth.net.isListening();
      },
      codeSample: (url, ...args) => {
        return web3Template(`eth.net.isListening()`, 'listening', url);
      },
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
      exec: (provider, proto, ...args) => {
        return provider.eth.net.getPeerCount();
      },
      codeSample: (url, ...args) => {
        return web3Template(`eth.net.getPeerCount()`, 'peers', url);
      },
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
      exec: (provider, proto, ...args) => {
        return provider.eth.getProtocolVersion();
      },
      codeSample: (url, ...args) => {
        return web3Template(`eth.getProtocolVersion()`, 'version', url);
      },
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
      exec: (provider, proto, ...args) => {
        return provider.eth.isSyncing();
      },
      codeSample: (url, ...args) => {
        return web3Template(`eth.isSyncing()`, 'isSyncing', url);
      },
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
      exec: (provider, proto, ...args) => {
        return provider.eth.getCoinbase();
      },
      codeSample: (url, ...args) => {
        return web3Template(`eth.getCoinbase()`, 'coinbase', url);
      },
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
      exec: (provider, proto, ...args) => {
        return provider.eth.isMining();
      },
      codeSample: (url, ...args) => {
        return web3Template(`eth.isMining()`, 'isMining', url);
      },
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
      exec: (provider, proto, ...args) => {
        return provider.eth.getHashrate();
      },
      codeSample: (url, ...args) => {
        return web3Template(`eth.getHashrate()`, 'hashRate', url);
      },
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
        return ethersTemplate('getGasPrice()', 'gasPrice', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {
        return provider.eth.getGasPrice();
      },
      codeSample: (url, ...args) => {
        return web3Template(`eth.getGasPrice()`, 'gasPrice', url);
      },
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
      exec: (provider, proto, ...args) => {
        return provider.eth.getAccounts();
      },
      codeSample: (url, ...args) => {
        return web3Template(`eth.getAccounts()`, 'accts', url);
      },
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
        return ethersTemplate('getBlockNumber()', 'blockNum', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {
        return provider.eth.getBlockNumber();
      },
      codeSample: (url, ...args) => {
        return web3Template(`eth.getBlockNumber()`, 'blockNum', url);
      },
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
      exec: (provider, proto, ...args) => {
        return provider.eth.getBalance(args[0], args[1]);
      },
      codeSample: (url, ...args) => {
        return web3Template(
          `eth.getBalance('${args[0]}', '${args[1]}')`,
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
    disabled: true,
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
    disabled: true,
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
    disabled: true,
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
    disabled: true,
    description: '🚫 This method is not YET supported in EtherFlow!',
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
  eth_estimateGas: {
    disabled: true,
    description: '🚫 This method is not YET supported in EtherFlow!',
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
        return provider.send('eth_getTransactionByHash', [args[0]]);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `.send('eth_getTransactionByHash', ['${args[0]}'])`,
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
    description: 'Returns the receipt of a transaction by transaction hash.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.waitForTransaction(...args);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `waitForTransaction('${args[0]}')`,
          'txReceipt',
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
  eth_getUncleByBlockHashAndIndex: {
    description:
      'Returns information about a uncle of a block by hash and uncle index position.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_getUncleByBlockHashAndIndex', args);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `send('eth_getUncleByBlockHashAndIndex', ['${args[0]}', '${args[1]}']`,
          'blockUncle',
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
          description: 'The uncle’s index position.',
          placeholder: 'i.e. 0x0',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getUncleByBlockNumberAndIndex: {
    description:
      'Returns information about a uncle of a block by number and uncle index position.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_getUncleByBlockNumberAndIndex', args);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `send('eth_getUncleByBlockNumberAndIndex', ['${args[0]}', '${args[1]}']`,
          'blockUncle',
          url
        );
      },
      args: [
        {
          type: 'textarea',
          description:
            'Hex block number, or the string "latest", "earliest" or "pending"',
          placeholder: 'i.e. 0x29c',
        },
        {
          type: 'textfield',
          description: 'The uncle’s index position.',
          placeholder: 'i.e. 0x0',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getCompilers: {
    description: 'Returns a list of available compilers in the client.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_getCompilers');
      },
      codeSample: (url, ...args) => {
        return ethersTemplate("send('eth_getCompilers')", 'compilerList', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_compileSolidity: {
    description: 'Returns compiled solidity code + ABI.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_compileSolidity', [args[0]]);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `send('eth_compileSolidity', ['${args[0]}'])`,
          'compiledCode',
          url
        );
      },
      args: [
        {
          type: 'textarea',
          description: 'The source code you wish to compile.',
          placeholder:
            'i.e. contract test { function multiply(uint a) returns(uint d) {   return a * 7;   } }',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_compileSerpent: {
    description: 'Returns compiled serpent code.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_compileSerpent', args);
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `send('eth_compileSerpent', ['${args[0]}'])`,
          'compiledCode',
          url
        );
      },
      args: [
        {
          type: 'textarea',
          description: 'The source code you wish to compile.',
          placeholder: 'i.e. /* some serpent */',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_newFilter: {
    description:
      'Creates a filter object, based on filter options, to notify when the state changes (logs). To check if the state has changed, call eth_getFilterChanges.',
    ethers: {
      exec: (provider, proto, ...args) => {
        const filter = {};
        filter.topics = args[3]
          ? args[3].split(',').map((x) => (x === 'null' ? null : x.split('||')))
          : [];
        filter.fromBlock = args[0] ? args[0] : 'latest';
        filter.toBlock = args[1] ? args[1] : 'latest';
        filter.address = args[2] ? args[2] : null;

        return provider.getLogs(filter);
      },
      codeSample: (url, ...args) => {
        return `const ethers = require("ethers");
// OR import ethers from 'ethers';

const filter = {
    topics: ${
      args[3]
        ? JSON.stringify(
            args[3].split(',').map((x) => (x === 'null' ? null : x.split('||')))
          )
        : '[]'
    },
    ${args[0] ? "fromBlock: '" + args[0] + "'" : "fromBlock: 'latest'"},
    ${args[1] ? "toBlock: '" + args[1] + "'" : "toBlock: 'latest'"},${
          args[2] ? "\n\taddress: '" + args[2] + "'" : ''
        }
};

// HTTP version
(async () => {
  const provider = new ethers.providers.JsonRpcProvider('${url}');
  const logs = await provider.getLogs(filter);
  console.log(logs);
})()


// WebSocket version
(async () => {
  const provider = new ethers.providers.WebSocketProvider('${url}');
  const logs = await provider.getLogs(filter);
  console.log(logs);
})()
`;
      },
      args: [
        {
          type: 'textfield',
          description:
            'fromBlock: Hex block number, or the string "latest", "earliest" or "pending"',
          placeholder: 'i.e. 0x29c',
        },
        {
          type: 'textfield',
          description:
            'toBlock: Hex block number, or the string "latest", "earliest" or "pending"',
          placeholder: 'i.e. 0x29c',
        },
        {
          type: 'textarea',
          description:
            'address: (optional) Contract address or a list of addresses from which logs should originate.',
          placeholder: 'i.e. 0x19624ffa41fe26744e74fdbba77bef967a222d4c',
        },
        {
          type: 'textarea',
          description:
            'topics: (optional) Comma separated strings with filter topics, for "or" functionality use ||. Topics are order-dependent.',
          placeholder: 'i.e. 0x1962||0x16c4,null',
        },
      ],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_newBlockFilter: {
    description:
      'Creates a filter in the node, to notify when a new block arrives. To check if the state has changed, call `eth_getFilterChanges`.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return new Promise((resolve, reject) => provider.on('block', resolve));
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          `on("block", (blockNumber) => {
    // your callback code here
  })`,
          'blockWatcher',
          url
        );
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_newPendingTransactionFilter: {
    description:
      'Creates a filter in the node, to notify when new pending transactions arrive. To check if the state has changed, call eth_getFilterChanges.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_newPendingTransactionFilter');
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(
          "send('eth_newPendingTransactionFilter')",
          'filter',
          url
        );
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_uninstallFilter: {
    disabled: true,
    description: '🚫 This method is not YET supported in EtherFlow!',
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
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getFilterChanges: {
    disabled: true,
    description:
      'This method is covered by eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return new Promise((resolve, reject) =>
          reject(
            'EtherFlow covers this method via eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter.'
          )
        );
      },
      codeSample: (url, ...args) => {
        return '/* EtherFlow covers this method via eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter */';
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getFilterLogs: {
    disabled: true,
    description:
      'This method is covered by eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return new Promise((resolve, reject) =>
          reject(
            'EtherFlow covers this method via eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter.'
          )
        );
      },
      codeSample: (url, ...args) => {
        return '/* EtherFlow covers this method via eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter */';
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getLogs: {
    disabled: true,
    description:
      'This method is covered by eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter.',
    ethers: {
      exec: (provider, proto, ...args) => {
        return new Promise((resolve, reject) =>
          reject(
            'EtherFlow covers this method via eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter.'
          )
        );
      },
      codeSample: (url, ...args) => {
        return '/* EtherFlow covers this method via eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter */';
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_getWork: {
    description:
      'Returns the hash of the current block, the seedHash, and the boundary condition to be met (“target”).',
    ethers: {
      exec: (provider, proto, ...args) => {
        return provider.send('eth_getWork');
      },
      codeSample: (url, ...args) => {
        return ethersTemplate(`send('eth_getWork')`, 'work', url);
      },
      args: [],
    },
    web3: {
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_submitWork: {
    disabled: true,
    description: '🚫 This method is not YET supported in EtherFlow!',
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
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
  eth_submitHashrate: {
    disabled: true,
    description: '🚫 This method is not YET supported in EtherFlow!',
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
      exec: (provider, proto, ...args) => {},
      codeSample: (url, ...args) => {},
      args: [],
    },
  },
};

export default Web3RpcCalls;
