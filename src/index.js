import React from 'react';
import ReactDOM from 'react-dom';
import AceEditor from 'react-ace';
import {
  LogsContainer,
  MethodCallContainer,
  StatusBarContainer,
  NavBarContainer,
  Web3MenuContainer,
} from './containers';
import { AppProvider, Web3Provider } from './context';
import { Router } from '@reach/router';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import './tailwind.output.css';

const Wrapper = () => (
  <Web3Provider>
    <AppProvider>
      <div className="">
        <NavBarContainer />
        <StatusBarContainer />

        <div className="flex">
          <Web3MenuContainer />
          <MethodCallContainer />
          <LogsContainer />
        </div>
        {/* end of grid */}

        <div className="hidden fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col space-y-6 py-6 bg-white shadow-xl overflow-y-scroll">
                  <header className="px-4 sm:px-6">
                    <div className="flex items-start justify-between space-x-3">
                      <h2 className="text-base leading-7 font-medium text-gray-900">
                        Code Sample for{' '}
                        <pre className="inline">eth_sendRawTransaction</pre>
                      </h2>
                      <div className="h-7 flex items-center">
                        <button
                          aria-label="Close panel"
                          className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
                        >
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </header>
                  <div className="relative flex-1 px-4 sm:px-6 sm:pr-10">
                    <div className="absolute inset-0 px-4 sm:px-6 overflow-hidden">
                      <AceEditor
                        placeholder="Placeholder Text"
                        mode="javascript"
                        theme="github"
                        name="code-sample"
                        width="100%"
                        height="100%"
                        className="round rounded-lg border"
                        fontSize={10}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={`const ethers = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  "https://red-icy-lake.quiknode.pro/94ac0ff5a151da24b31db48cd389d46e9cf6e6cc/"
);

(async () => {
  const result = await provider.sendTransaction("0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675");
  console.log('result:', result)
})();`}
                        setOptions={{
                          enableBasicAutocompletion: false,
                          enableLiveAutocompletion: false,
                          enableSnippets: false,
                          showLineNumbers: true,
                          tabSize: 2,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="hidden fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto absolute bottom-6">
            <div className="rounded-lg shadow-xs">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://pbs.twimg.com/profile_images/880519774798835712/qzz95hUu_400x400.jpg"
                      alt=""
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm leading-5 font-medium text-gray-900">
                      Sponsored by QuikNode
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-500">
                      Huge thanks to QuikNode for letting us build EtherFlow
                      with free nodes.
                    </p>
                    <div className="mt-4 flex">
                      <span className="inline-flex rounded-md shadow-sm">
                        <a
                          href="https://quiknode.io/?utm_source=etherflow"
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                        >
                          Visit QuikNode
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  </Web3Provider>
);

const App = () => (
  <Router>
    <Wrapper default />
    <Wrapper path="/:web3URL" />
    <Wrapper path="/:web3URL/:web3Lib" />
    <Wrapper path="/:web3URL/:web3Lib/:currentMethod" />
    <Wrapper path="/:web3URL/:web3Lib/:currentMethod/*" />
  </Router>
);

// Disable code-sandbox console
if (console.feed) {
  Object.keys(console.feed.pointers).forEach((key) => {
    console[key] = console.feed.pointers[key];
  });
}

ReactDOM.render(<App />, document.querySelector('#root'));
