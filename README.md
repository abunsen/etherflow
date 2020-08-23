<center>
  <h2 align="center">EtherFlow</h2>

  <p align="center">
    A tool for interacting/debugging with Ethereum JSON-RPC and generating sample code.
    <br />
    <a href="https://etherflow.quiknode.io">View Demo</a>
    ·
    <a href="https://github.com/abunsen/etherflow/issues/new?assignees=&labels=&template=bug_report.md&title=">Report Bug</a>
    ·
    <a href="https://github.com/abunsen/etherflow/issues/new?assignees=&labels=&template=feature_request.md&title=">Request Feature</a>
  </p>
</center>

# About

EtherFlow is a tool for sending requests to Ethereum JSON-RPC endpoints without having to write code. It supports most standard RPC methods and the [trace module for Parity/OpenEthereum](https://openethereum.github.io/wiki/JSONRPC-trace-module#trace_transaction). It updates the URL and embeds your RPC endpoint, preferred library, method call and params in the URL for easy sharing to any relevant parties.

# Quik Start

If you don't want to install anything just go here: https://etherflow.quiknode.io

You can also just run this in your terminal:

```
git clone git@github.com:abunsen/etherflow.git && cd etherflow && npm install && npm start
```

# Adding a new lib

There is a folder `etherflow -> src -> helpers -> libs` [link](src/helpers/libs) that contains all of the supported libraries. If you'd like to add a new front end library, it's easy enough:

1. Add a file in the above folder with the `<name of the lib>.js`
2. Add a every single supported RPC method from [here](src/helpers/web3Config.js) to an exported object
3. Add `exec`, `codeSample` and `args` to each method
4. Test it
5. You're done!

If you'd like to add a new back end library, please [open an issue](https://github.com/abunsen/etherflow/issues/new?assignees=&labels=&template=feature_request.md&title=New+Backend+Lib+Support) so we can discuss the best way to support this!

# Contributing

Please feel free to add tests, change the code so it has better organization, etc. I'm very happy to receive PRs.

# Wishlist (in order of priority)

- [ ] Enable ABI upload for smart contracts on eth_call
- [ ] Make trace_call use the ABI from point above (docs: https://openethereum.github.io/wiki/JSONRPC-trace-module)
- [ ] Enable eth_newFilter for web3.js
