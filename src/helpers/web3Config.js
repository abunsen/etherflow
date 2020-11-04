import * as calls from './libs';

const Web3RpcCalls = {
  web3_clientVersion: {
    description: 'Returns the current client version.',
    web3: calls.web3.default.web3_clientVersion,
    ethers: calls.ethers.default.web3_clientVersion,
  },
  web3_sha3: {
    description:
      'Returns Keccak-256 (not the standardized SHA3-256) of the given data.',
    web3: calls.web3.default.web3_sha3,
    ethers: calls.ethers.default.web3_sha3,
  },
  net_version: {
    description: 'Returns the current network id.',
    web3: calls.web3.default.net_version,
    ethers: calls.ethers.default.net_version,
  },
  net_listening: {
    description:
      'Returns `true` if client is actively listening for network connections.',
    web3: calls.web3.default.net_listening,
    ethers: calls.ethers.default.net_listening,
  },
  net_peerCount: {
    description: 'Returns number of peers currently connected to the client.',
    web3: calls.web3.default.net_peerCount,
    ethers: calls.ethers.default.net_peerCount,
  },
  eth_protocolVersion: {
    description: 'Returns the current ethereum protocol version.',
    web3: calls.web3.default.eth_protocolVersion,
    ethers: calls.ethers.default.eth_protocolVersion,
  },
  eth_syncing: {
    description: 'Returns an object with data about the sync status or false.',
    web3: calls.web3.default.eth_syncing,
    ethers: calls.ethers.default.eth_syncing,
  },
  eth_coinbase: {
    description: 'Returns the client coinbase address.',
    web3: calls.web3.default.eth_coinbase,
    ethers: calls.ethers.default.eth_coinbase,
  },
  eth_mining: {
    description: 'Returns `true` if client is actively mining new blocks.',
    web3: calls.web3.default.eth_mining,
    ethers: calls.ethers.default.eth_mining,
  },
  eth_hashrate: {
    description:
      'Returns the number of hashes per second that the node is mining with.',
    web3: calls.web3.default.eth_hashrate,
    ethers: calls.ethers.default.eth_hashrate,
  },
  eth_gasPrice: {
    description: 'Returns the current price per gas in wei.',
    web3: calls.web3.default.eth_gasPrice,
    ethers: calls.ethers.default.eth_gasPrice,
  },
  eth_accounts: {
    description: 'Returns a list of addresses owned by client.',
    web3: calls.web3.default.eth_accounts,
    ethers: calls.ethers.default.eth_accounts,
  },
  eth_blockNumber: {
    description: 'Returns the number of most recent block.',
    web3: calls.web3.default.eth_blockNumber,
    ethers: calls.ethers.default.eth_blockNumber,
  },
  eth_getBalance: {
    description: 'Returns the balance of the account of given address.',
    web3: calls.web3.default.eth_getBalance,
    ethers: calls.ethers.default.eth_getBalance,
  },
  eth_getStorageAt: {
    description:
      'Returns the value from a storage position at a given address.',
    web3: calls.web3.default.eth_getStorageAt,
    ethers: calls.ethers.default.eth_getStorageAt,
  },
  eth_getTransactionCount: {
    description: 'Returns the number of transactions sent from an address.',
    web3: calls.web3.default.eth_getTransactionCount,
    ethers: calls.ethers.default.eth_getTransactionCount,
  },
  eth_getBlockTransactionCountByHash: {
    description:
      'Returns the number of transactions in a block from a block matching the given block hash.',
    web3: calls.web3.default.eth_getBlockTransactionCountByHash,
    ethers: calls.ethers.default.eth_getBlockTransactionCountByHash,
  },
  eth_getBlockTransactionCountByNumber: {
    description:
      'Returns the number of transactions in a block matching the given block number.',
    web3: calls.web3.default.eth_getBlockTransactionCountByNumber,
    ethers: calls.ethers.default.eth_getBlockTransactionCountByNumber,
  },
  eth_getUncleCountByBlockHash: {
    description:
      'Returns the number of uncles in a block from a block matching the given block hash.',
    web3: calls.web3.default.eth_getUncleCountByBlockHash,
    ethers: calls.ethers.default.eth_getUncleCountByBlockHash,
  },
  eth_getUncleCountByBlockNumber: {
    description:
      'Returns the number of uncles in a block from a block matching the given block number.',
    web3: calls.web3.default.eth_getUncleCountByBlockNumber,
    ethers: calls.ethers.default.eth_getUncleCountByBlockNumber,
  },
  eth_getCode: {
    description: 'Returns code at a given address.',
    web3: calls.web3.default.eth_getCode,
    ethers: calls.ethers.default.eth_getCode,
  },
  eth_sign: {
    disabled: true,
    description: '🚫 This method is not supported in EtherFlow!',
    web3: calls.web3.default.eth_sign,
    ethers: calls.ethers.default.eth_sign,
  },
  eth_signTransaction: {
    disabled: true,
    description: '🚫 This method is not supported in EtherFlow!',
    web3: calls.web3.default.eth_signTransaction,
    ethers: calls.ethers.default.eth_signTransaction,
  },
  eth_sendTransaction: {
    disabled: true,
    description: '🚫 This method is not supported in EtherFlow!',
    web3: calls.web3.default.eth_sendTransaction,
    ethers: calls.ethers.default.eth_sendTransaction,
  },
  eth_sendRawTransaction: {
    description:
      'Creates new message call transaction or a contract creation for signed transactions.',
    web3: calls.web3.default.eth_sendRawTransaction,
    ethers: calls.ethers.default.eth_sendRawTransaction,
  },
  eth_call: {
    description: 'Call any read-only function on a deployed contract',
    web3: calls.web3.default.eth_call,
    ethers: calls.ethers.default.eth_call,
  },
  eth_estimateGas: {
    disabled: true,
    description: '🚫 This method is not YET supported in EtherFlow!',
    web3: calls.web3.default.eth_estimateGas,
    ethers: calls.ethers.default.eth_estimateGas,
  },
  eth_getBlockByHash: {
    description: 'Returns information about a block by hash.',
    web3: calls.web3.default.eth_getBlockByHash,
    ethers: calls.ethers.default.eth_getBlockByHash,
  },
  eth_getBlockByNumber: {
    description: 'Returns information about a block by block number.',
    web3: calls.web3.default.eth_getBlockByNumber,
    ethers: calls.ethers.default.eth_getBlockByNumber,
  },
  eth_getTransactionByHash: {
    description:
      'Returns the information about a transaction requested by transaction hash.',
    web3: calls.web3.default.eth_getTransactionByHash,
    ethers: calls.ethers.default.eth_getTransactionByHash,
  },
  eth_getTransactionByBlockHashAndIndex: {
    description:
      'Returns information about a transaction by block hash and transaction index position.',
    web3: calls.web3.default.eth_getTransactionByBlockHashAndIndex,
    ethers: calls.ethers.default.eth_getTransactionByBlockHashAndIndex,
  },
  eth_getTransactionByBlockNumberAndIndex: {
    description:
      'Returns information about a transaction by block number and transaction index position.',
    web3: calls.web3.default.eth_getTransactionByBlockNumberAndIndex,
    ethers: calls.ethers.default.eth_getTransactionByBlockNumberAndIndex,
  },
  eth_getTransactionReceipt: {
    description: 'Returns the receipt of a transaction by transaction hash.',
    web3: calls.web3.default.eth_getTransactionReceipt,
    ethers: calls.ethers.default.eth_getTransactionReceipt,
  },
  eth_getUncleByBlockHashAndIndex: {
    description:
      'Returns information about a uncle of a block by hash and uncle index position.',
    web3: calls.web3.default.eth_getUncleByBlockHashAndIndex,
    ethers: calls.ethers.default.eth_getUncleByBlockHashAndIndex,
  },
  eth_getUncleByBlockNumberAndIndex: {
    description:
      'Returns information about a uncle of a block by number and uncle index position.',
    web3: calls.web3.default.eth_getUncleByBlockNumberAndIndex,
    ethers: calls.ethers.default.eth_getUncleByBlockNumberAndIndex,
  },
  eth_getCompilers: {
    description: 'Returns a list of available compilers in the client.',
    web3: calls.web3.default.eth_getCompilers,
    ethers: calls.ethers.default.eth_getCompilers,
  },
  eth_compileSolidity: {
    description: 'Returns compiled solidity code + ABI.',
    web3: calls.web3.default.eth_compileSolidity,
    ethers: calls.ethers.default.eth_compileSolidity,
  },
  eth_compileSerpent: {
    description: 'Returns compiled serpent code.',
    web3: calls.web3.default.eth_compileSerpent,
    ethers: calls.ethers.default.eth_compileSerpent,
  },
  eth_newFilter: {
    description:
      'Creates a filter object, based on filter options, to notify when the state changes (logs). The resulting value from the filter is immediately returned.',
    web3: calls.web3.default.eth_newFilter,
    ethers: calls.ethers.default.eth_newFilter,
  },
  eth_newBlockFilter: {
    description:
      'Creates a filter in the node, to notify when a new block arrives. To check if the state has changed, call `eth_getFilterChanges`.',
    web3: calls.web3.default.eth_newBlockFilter,
    ethers: calls.ethers.default.eth_newBlockFilter,
  },
  eth_newPendingTransactionFilter: {
    description:
      'Creates a filter in the node, to notify when new pending transactions arrive. The resulting value from the filter is immediately returned.',
    web3: calls.web3.default.eth_newPendingTransactionFilter,
    ethers: calls.ethers.default.eth_newPendingTransactionFilter,
  },
  eth_uninstallFilter: {
    disabled: true,
    description: '🚫 This method is not YET supported in EtherFlow!',
    web3: calls.web3.default.eth_uninstallFilter,
    ethers: calls.ethers.default.eth_uninstallFilter,
  },
  eth_getFilterChanges: {
    disabled: true,
    description:
      'This method is covered by eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter.',
    web3: calls.web3.default.eth_getFilterChanges,
    ethers: calls.ethers.default.eth_getFilterChanges,
  },
  eth_getFilterLogs: {
    disabled: true,
    description:
      'This method is covered by eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter.',
    web3: calls.web3.default.eth_getFilterLogs,
    ethers: calls.ethers.default.eth_getFilterLogs,
  },
  eth_getLogs: {
    disabled: true,
    description:
      'This method is covered by eth_newFilter, eth_newBlockFilter and eth_newPendingTransactionFilter.',
    web3: calls.web3.default.eth_getLogs,
    ethers: calls.ethers.default.eth_getLogs,
  },
  eth_getWork: {
    description:
      'Returns the hash of the current block, the seedHash, and the boundary condition to be met (“target”).',
    web3: calls.web3.default.eth_getWork,
    ethers: calls.ethers.default.eth_getWork,
  },
  trace_block: {
    description:
      'Returns traces created at given block (OpenEthereum or Parity only).',
    web3: calls.web3.default.trace_block,
    ethers: calls.ethers.default.trace_block,
  },
  trace_transaction: {
    description:
      'Returns all traces of given transaction (OpenEthereum or Parity only).',
    web3: calls.web3.default.trace_transaction,
    ethers: calls.ethers.default.trace_transaction,
  },
  trace_get: {
    description:
      'Returns trace at given position (OpenEthereum or Parity only).',
    web3: calls.web3.default.trace_get,
    ethers: calls.ethers.default.trace_get,
  },
  trace_rawTransaction: {
    description:
      'Traces a call to `eth_sendRawTransaction` without making the call, returning the traces.',
    web3: calls.web3.default.trace_rawTransaction,
    ethers: calls.ethers.default.trace_rawTransaction,
  },
  trace_replayBlockTransactions: {
    description:
      'Replays all transactions in a block returning the requested traces for each transaction.',
    web3: calls.web3.default.trace_replayBlockTransactions,
    ethers: calls.ethers.default.trace_replayBlockTransactions,
  },
  trace_replayTransaction: {
    description: 'Replays a transaction, returning the traces.',
    web3: calls.web3.default.trace_replayTransaction,
    ethers: calls.ethers.default.trace_replayTransaction,
  },
  trace_filter: {
    description: 'Returns traces matching given filter.',
    web3: calls.web3.default.trace_filter,
    ethers: calls.ethers.default.trace_filter,
  },
  trace_call: {
    description:
      'Executes the given call and returns a number of possible traces for it.',
    web3: calls.web3.default.trace_call,
    ethers: calls.ethers.default.trace_call,
  },
};

export default Web3RpcCalls;
