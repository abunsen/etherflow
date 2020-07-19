import React from 'react';
import ReactDOM from 'react-dom';
import {
  CodeSampleContainer,
  LogsContainer,
  MethodCallContainer,
  StatusBarContainer,
  NavBarContainer,
  Web3MenuContainer,
  SponsoredAdContainer,
} from './containers';
import { AppProvider } from './context';
import { Router } from '@reach/router';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import './tailwind.output.css';

const Wrapper = () => (
  <AppProvider>
    <div>
      <NavBarContainer />
      <StatusBarContainer />

      <div className="flex">
        <Web3MenuContainer />
        <MethodCallContainer />
        <LogsContainer />
      </div>

      <CodeSampleContainer />
      <SponsoredAdContainer />
    </div>
  </AppProvider>
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

ReactDOM.render(<App />, document.querySelector('#root'));
