const web3Template = (methodCall, varName, url) => {
  return `const Web3 = require("web3");
// OR import Web3 from 'web3';

// HTTP version
(async () => {
  const web3 = new Web3('${url}');
  const ${varName} = await web3.${methodCall};
  console.log(${varName});
})()
`;
};

const web3TraceTemplate = (
  rpcMethod,
  methodCall,
  args,
  formatters,
  varName,
  url
) => {
  return `const Web3 = require("web3");
// OR import Web3 from 'web3';

// HTTP version
(async () => {
  const web3 = new Web3('${url}');
  web3.extend({
    methods: [
      {
        name: '${methodCall}',
        call: '${rpcMethod}',
        params: ${formatters.length},
        inputFormatter: [${formatters.join(', ')}],
      },
    ],
  });
  const ${varName} = await web3.${methodCall}('${args.join("', '")}');
  console.log(${varName});
})()
`;
};

const Web3JSCalls = {
  contract_function: {
    exec: (provider, proto, ...args) => {
      // TODO
    },
    codeSample: (url, ...args) => {
      // TODO
    },
    args: [
      {
        type: 'textarea',
        description: 'Address of contract',
        placeholder: 'i.e. 0x91b51c173a4...',
      },
      {
        type: 'textarea',
        description: 'ABI of contract',
        placeholder:
          'i.e. [{"inputs":[{"internalType":"uint256","name":"chainId...',
      },
      // TODO
    ],
  },
  web3_clientVersion: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getNodeInfo();
    },
    codeSample: (url, ...args) => {
      return web3Template('eth.getNodeInfo()', 'version', url);
    },
    args: [],
  },
  web3_sha3: {
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
  net_version: {
    exec: (provider, proto, ...args) => {
      return provider.eth.net.getId();
    },
    codeSample: (url, ...args) => {
      return web3Template(`eth.net.getId()`, 'network', url);
    },
    args: [],
  },
  net_listening: {
    exec: (provider, proto, ...args) => {
      return provider.eth.net.isListening();
    },
    codeSample: (url, ...args) => {
      return web3Template(`eth.net.isListening()`, 'listening', url);
    },
    args: [],
  },
  net_peerCount: {
    exec: (provider, proto, ...args) => {
      return provider.eth.net.getPeerCount();
    },
    codeSample: (url, ...args) => {
      return web3Template(`eth.net.getPeerCount()`, 'peers', url);
    },
    args: [],
  },
  eth_protocolVersion: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getProtocolVersion();
    },
    codeSample: (url, ...args) => {
      return web3Template(`eth.getProtocolVersion()`, 'version', url);
    },
    args: [],
  },
  eth_syncing: {
    exec: (provider, proto, ...args) => {
      return provider.eth.isSyncing();
    },
    codeSample: (url, ...args) => {
      return web3Template(`eth.isSyncing()`, 'isSyncing', url);
    },
    args: [],
  },
  eth_coinbase: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getCoinbase();
    },
    codeSample: (url, ...args) => {
      return web3Template(`eth.getCoinbase()`, 'coinbase', url);
    },
    args: [],
  },
  eth_mining: {
    exec: (provider, proto, ...args) => {
      return provider.eth.isMining();
    },
    codeSample: (url, ...args) => {
      return web3Template(`eth.isMining()`, 'isMining', url);
    },
    args: [],
  },
  eth_hashrate: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getHashrate();
    },
    codeSample: (url, ...args) => {
      return web3Template(`eth.getHashrate()`, 'hashRate', url);
    },
    args: [],
  },
  eth_gasPrice: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getGasPrice();
    },
    codeSample: (url, ...args) => {
      return web3Template(`eth.getGasPrice()`, 'gasPrice', url);
    },
    args: [],
  },
  eth_accounts: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getAccounts();
    },
    codeSample: (url, ...args) => {
      return web3Template(`eth.getAccounts()`, 'accts', url);
    },
    args: [],
  },
  eth_blockNumber: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getBlockNumber();
    },
    codeSample: (url, ...args) => {
      return web3Template(`eth.getBlockNumber()`, 'blockNum', url);
    },
    args: [],
  },
  eth_getBalance: {
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
  eth_getStorageAt: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getStorageAt(...args);
    },
    codeSample: (url, ...args) => {
      return web3Template(
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
  eth_getTransactionCount: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getTransactionCount(...args);
    },
    codeSample: (url, ...args) => {
      return web3Template(
        `eth.getTransactionCount('${args[0]}', '${args[1]}')`,
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
  eth_getBlockTransactionCountByHash: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getBlockTransactionCount(args[0]);
    },
    codeSample: (url, ...args) => {
      return web3Template(
        `eth.getBlockTransactionCount('${args[0]}')`,
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
  eth_getBlockTransactionCountByNumber: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getBlockTransactionCount(args[0]);
    },
    codeSample: (url, ...args) => {
      return web3Template(
        `eth.getBlockTransactionCount('${args[0]}')`,
        'txCount',
        url
      );
    },
    args: [
      {
        type: 'textarea',
        description:
          'Integer in decimal format of a block to get transaction count from',
        placeholder: 'i.e. 10674793',
      },
    ],
  },
  eth_getUncleCountByBlockHash: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getBlockUncleCount(args[0]);
    },
    codeSample: (url, ...args) => {
      return web3Template(
        `eth.getBlockUncleCount('${args[0]}')`,
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
  eth_getUncleCountByBlockNumber: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getBlockUncleCount(args[0]);
    },
    codeSample: (url, ...args) => {
      return web3Template(
        `eth.getBlockUncleCount('${args[0]}')`,
        'uncleCount',
        url
      );
    },
    args: [
      {
        type: 'textarea',
        description:
          'Integer in decimal format of a block to get uncle count from',
        placeholder: 'i.e. 10674793',
      },
    ],
  },
  eth_getCode: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getCode(...args);
    },
    codeSample: (url, ...args) => {
      return web3Template(
        `eth.getCode('${args[0]}', '${args[1]}')`,
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
          'Integer block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. latest or pending',
      },
    ],
  },
  eth_sign: {
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
  eth_signTransaction: {
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
  eth_sendTransaction: {
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
  eth_sendRawTransaction: {
    exec: (provider, proto, ...args) => {
      return provider.eth.sendSignedTransaction(...args);
    },
    codeSample: (url, ...args) => {
      return web3Template(`eth.sendSignedTransaction('${args[0]}')`, 'tx', url);
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
  eth_call: {
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
  eth_estimateGas: {
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
  eth_getBlockByHash: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getBlock(args[0], args[1] === 'true');
    },
    codeSample: (url, ...args) => {
      return web3Template(
        `eth.getBlock('${args[0]}', ${args[1]})`,
        'blockData',
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
        type: 'boolean',
        description: 'Should we return full transaction objects?',
        placeholder: '',
      },
    ],
  },
  eth_getBlockByNumber: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getBlock(args[0], args[1] === 'true');
    },
    codeSample: (url, ...args) => {
      return web3Template(
        `eth.getBlock('${args[0]}', ${args[1]})`,
        'blockData',
        url
      );
    },
    args: [
      {
        type: 'textarea',
        description:
          'Integer in decimal format of a block number to get information from',
        placeholder: 'i.e. 10674793',
      },
      {
        type: 'boolean',
        description: 'Should we return full transaction objects?',
        placeholder: '',
      },
    ],
  },
  eth_getTransactionByHash: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getTransaction(args[0]);
    },
    codeSample: (url, ...args) => {
      return web3Template(`eth.getTransaction('${args[0]}')`, 'txInfo', url);
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
  eth_getTransactionByBlockHashAndIndex: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getTransactionFromBlock(...args);
    },
    codeSample: (url, ...args) => {
      return web3Template(
        `eth.getTransactionFromBlock('${args[0]}', '${args[1]}')`,
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
        description: 'Integer in decimal format of tx position in the block',
        placeholder: 'i.e. 0, 1, 2...',
      },
    ],
  },
  eth_getTransactionByBlockNumberAndIndex: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getTransactionFromBlock(...args);
    },
    codeSample: (url, ...args) => {
      return web3Template(
        `eth.getTransactionFromBlock('${args[0]}', '${args[1]}')`,
        'txInfo',
        url
      );
    },
    args: [
      {
        type: 'textarea',
        description:
          'Integer in decimal format, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. 10674793',
      },
      {
        type: 'textfield',
        description: 'Integer in decimal format of tx position in the block',
        placeholder: 'i.e. 0, 1, 2...',
      },
    ],
  },
  eth_getTransactionReceipt: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getTransactionReceipt(args[0]);
    },
    codeSample: (url, ...args) => {
      return web3Template(
        `eth.getTransactionReceipt('${args[0]}')`,
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
  eth_getUncleByBlockHashAndIndex: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getUncle(...args);
    },
    codeSample: (url, ...args) => {
      return web3Template(
        `eth.getUncle('${args[0]}', '${args[1]}')`,
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
        description: 'The uncle’s index position as an integer.',
        placeholder: 'i.e. 0, 1, 2...',
      },
    ],
  },
  eth_getUncleByBlockNumberAndIndex: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getUncle(...args);
    },
    codeSample: (url, ...args) => {
      return web3Template(
        `eth.getUncle('${args[0]}', '${args[1]}')`,
        'blockUncle',
        url
      );
    },
    args: [
      {
        type: 'textarea',
        description:
          'Integer in decimal format of a block to get transaction count from',
        placeholder: 'i.e. 10674793',
      },
      {
        type: 'textfield',
        description: 'The uncle’s index position as an integer.',
        placeholder: 'i.e. 0, 1, 2...',
      },
    ],
  },
  eth_getCompilers: {
    exec: (provider, proto, ...args) => {
      return new Promise((resolve, reject) =>
        reject('web3.js does not support this method.')
      );
    },
    codeSample: (url, ...args) => {
      return '/* Not Supported by web3.js */';
    },
    args: [],
  },
  eth_compileSolidity: {
    exec: (provider, proto, ...args) => {
      return new Promise((resolve, reject) =>
        reject('web3.js does not support this method.')
      );
    },
    codeSample: (url, ...args) => {
      return '/* Not Supported by web3.js */';
    },
    args: [],
  },
  eth_compileSerpent: {
    exec: (provider, proto, ...args) => {
      return new Promise((resolve, reject) =>
        reject('web3.js does not support this method.')
      );
    },
    codeSample: (url, ...args) => {
      return '/* Not Supported by web3.js */';
    },
    args: [],
  },
  eth_newFilter: {
    exec: (provider, proto, ...args) => {
      return new Promise((resolve, reject) =>
        reject('EtherFlow does not YET support this method.')
      );
    },
    codeSample: (url, ...args) => {
      return '/* Not Supported by EtherFlow yet */';
    },
    args: [],
  },
  eth_newBlockFilter: {
    exec: (provider, proto, ...args) => {
      return new Promise((resolve, reject) =>
        provider.eth.subscribe('newBlockHeaders', (error, result) => {
          if (!error) resolve(result);
        })
      );
    },
    codeSample: (url, ...args) => {
      return `const Web3 = require("web3");
// OR Web3 ethers from 'web3';

// HTTP version
(async () => {
  const web3 = new Web3('${url}');
  web3.eth.subscribe('newBlockHeaders', console.log);
})()`;
    },
    args: [],
  },
  eth_newPendingTransactionFilter: {
    exec: (provider, proto, ...args) => {
      return new Promise((resolve, reject) =>
        provider.eth.subscribe('pendingTransactions', (error, result) => {
          if (!error) resolve(result);
        })
      );
    },
    codeSample: (url, ...args) => {
      return `const Web3 = require("web3");
// OR Web3 ethers from 'web3';

// HTTP version
(async () => {
  const web3 = new Web3('${url}');
  web3.eth.subscribe('pendingTransactions', console.log);
})()`;
    },
    args: [],
  },
  eth_uninstallFilter: {
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
  eth_getFilterChanges: {
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
  eth_getFilterLogs: {
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
  eth_getLogs: {
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
  eth_getWork: {
    exec: (provider, proto, ...args) => {
      return provider.eth.getWork();
    },
    codeSample: (url, ...args) => {
      return web3Template(`eth.getWork()`, 'work', url);
    },
    args: [],
  },
  trace_block: {
    exec: (provider, proto, ...args) => {
      provider.extend({
        methods: [
          {
            name: 'parityTraceBlock',
            call: 'trace_block',
            params: 1,
            inputFormatter: [provider.utils.numberToHex],
          },
        ],
      });
      return provider.parityTraceBlock(args[0]);
    },
    codeSample: (url, ...args) => {
      return web3TraceTemplate(
        'trace_block',
        'parityTraceBlock',
        [args[0]],
        ['web3.utils.numberToHex'],
        'trace',
        url
      );
    },
    args: [
      {
        type: 'textfield',
        description: 'Integer of block number only',
        placeholder: 'i.e. 10708846',
      },
    ],
  },
  trace_transaction: {
    exec: (provider, proto, ...args) => {
      provider.extend({
        methods: [
          {
            name: 'parityTraceTx',
            call: 'trace_transaction',
            params: 1,
            inputFormatter: [null],
          },
        ],
      });
      return provider.parityTraceTx(args[0]);
    },
    codeSample: (url, ...args) => {
      return web3TraceTemplate(
        'trace_transaction',
        'parityTraceTx',
        args,
        ['null'],
        'trace',
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
  trace_get: {
    exec: (provider, proto, ...args) => {
      provider.extend({
        methods: [
          {
            name: 'parityTraceGet',
            call: 'trace_get',
            params: 1,
            inputFormatter: [null, provider.utils.numberToHex],
          },
        ],
      });
      return provider.parityTraceGet(args[0], args[1].split(','));
    },
    codeSample: (url, ...args) => {
      return web3TraceTemplate(
        'trace_get',
        'parityTraceGet',
        args,
        ['null', 'web3.utils.numberToHex'],
        'trace',
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
      {
        type: 'textfield',
        description:
          'Integer index positions of the traces, separated by commas',
        placeholder: 'i.e. 0,1,2',
      },
    ],
  },
  trace_rawTransaction: {
    exec: (provider, proto, ...args) => {
      provider.extend({
        methods: [
          {
            name: 'parityTraceRawTx',
            call: 'trace_rawTransaction',
            params: 2,
            inputFormatter: [null, null],
          },
        ],
      });
      return provider.parityTraceRawTx(args[0], [args[1]]);
    },
    codeSample: (url, ...args) => {
      return web3TraceTemplate(
        'trace_rawTransaction',
        'parityTraceRawTx',
        [args[0], [args[1]]],
        ['null', 'null'],
        'trace',
        url
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Raw transaction data.',
        placeholder:
          'i.e. 0xf86a8086d55698372431831e848094f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008025a009ebb6ca057a0535d6186462bc0b465b561c94a295bdb0621fc19208ab149a9ca0440ffd775ce91a833ab410777204d5341a6f9fa91216a6f3ee2c051fea6a0428',
      },
      {
        type: 'textfield',
        description: 'Type of trace, one of: `vmTrace`, `trace`, `stateDiff`',
        placeholder: 'i.e. vmTrace',
      },
    ],
  },
  trace_replayBlockTransactions: {
    exec: (provider, proto, ...args) => {
      provider.extend({
        methods: [
          {
            name: 'parityTraceBlockTx',
            call: 'trace_replayBlockTransactions',
            params: 2,
            inputFormatter: [provider.utils.numberToHex, null],
          },
        ],
      });
      return provider.parityTraceBlockTx(args[0], [args[1]]);
    },
    codeSample: (url, ...args) => {
      return web3TraceTemplate(
        'trace_replayBlockTransactions',
        'parityTraceBlockTx',
        [args[0], [args[1]]],
        ['web3.utils.numberToHex', 'null'],
        'trace',
        url
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Integer of block number only',
        placeholder: 'i.e. 10708846',
      },
      {
        type: 'textfield',
        description: 'Type of trace, one of: `vmTrace`, `trace`, `stateDiff`',
        placeholder: 'i.e. vmTrace',
      },
    ],
  },
  trace_replayTransaction: {
    exec: (provider, proto, ...args) => {
      provider.extend({
        methods: [
          {
            name: 'parityTraceReplayTx',
            call: 'trace_replayTransaction',
            params: 2,
            inputFormatter: [null, null],
          },
        ],
      });
      return provider.parityTraceReplayTx(args[0], [args[1]]);
    },
    codeSample: (url, ...args) => {
      return web3TraceTemplate(
        'trace_replayTransaction',
        'parityTraceReplayTx',
        [args[0], [args[1]]],
        ['null', 'null'],
        'trace',
        url
      );
    },
    args: [
      {
        type: 'textarea',
        description: 'Hash of a transaction to get trace for',
        placeholder:
          'i.e. 0x02d4a872e096445e80d05276ee756cefef7f3b376bcec14246469c0cd97dad8f',
      },
      {
        type: 'textfield',
        description: 'Type of trace, one of: `vmTrace`, `trace`, `stateDiff`',
        placeholder: 'i.e. vmTrace',
      },
    ],
  },
  trace_filter: {
    exec: (provider, proto, ...args) => {
      const filter = {};
      filter.fromBlock = args[0] ? args[0] : 'latest';
      filter.toBlock = args[1] ? args[1] : 'latest';
      if (args[2] !== '') filter.fromAddress = [args[2]];
      if (args[3] !== '') filter.toAddress = [args[3]];
      if (args[4] !== '') filter.after = +args[4];
      if (args[5] !== '') filter.count = +args[5];

      provider.extend({
        methods: [
          {
            name: 'parityTraceFilter',
            call: 'trace_filter',
            params: 1,
            inputFormatter: [null],
          },
        ],
      });
      return provider.parityTraceFilter(filter);
    },
    codeSample: (url, ...args) => {
      return `const Web3 = require("web3");
// OR import Web3 from 'web3';

// HTTP version
(async () => {
  const web3 = new Web3('${url}');
  web3.extend({
    methods: [
      {
        name: 'parityTraceFilter',
        call: 'trace_filter',
        params: 1,
        inputFormatter: [null],
      },
    ],
  });
  const trace = await web3.parityTraceFilter({
    "fromBlock": "${args[0] || 'latest'}",
    "toBlock": "${args[1] || 'latest'}",${
        args[2] ? '\n\t"fromAddress": ["' + args[2] + '"],' : ''
      }${args[3] ? '\n\t"toAddress": ["' + args[3] + '"],' : ''}${
        args[4] ? '\n\t"after": ' + args[3] + ',' : ''
      }${args[4] ? '\n\t"count": ' + args[4] + ',' : ''}
  });
  console.log(trace);
})()
`;
    },
    args: [
      {
        type: 'textfield',
        description:
          'fromBlock: Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. 0xA37D49',
      },
      {
        type: 'textfield',
        description:
          'toBlock: Hex block number, or the string "latest", "earliest" or "pending"',
        placeholder: 'i.e. 0xA37E63',
      },
      {
        type: 'textarea',
        description:
          'fromAddress: (optional) Contract address or a list of addresses from which logs should originate.',
        placeholder: 'i.e. 0x19624ffa41fe26744e74fdbba77bef967a222d4c',
      },
      {
        type: 'textarea',
        description:
          'toAddress: (optional) Contract address or a list of addresses from which logs should originate.',
        placeholder: 'i.e. 0x19624ffa41fe26744e74fdbba77bef967a222d4c',
      },
      {
        type: 'textfield',
        description:
          'topics: (optional) The offset trace number as an integer.',
        placeholder: 'i.e. 1000',
      },
      {
        type: 'textfield',
        description:
          'topics: (optional) The number of traces to display in a batch as an integer.',
        placeholder: 'i.e. 10',
      },
    ],
  },
};

export default Web3JSCalls;
