import React, { useContext } from 'react';
import { CodeSample } from '../components';
import { AppContext } from '../context';
import { useParams } from '@reach/router';
import { getCodeSampleFriendlyArguments } from '../helpers/contracts';

const TRACE_CALL = 'trace_call';
const TRACE_ARGS_OFFSET = 2;

const CodeSampleContainer = () => {
  const { codeSampleVisible, toggleSampleCode, abi } = useContext(AppContext);
  const params = useParams();
  const {
    web3URL = '',
    web3Lib = '',
    currentMethod = '',
    formArgs = '',
  } = params;
  const argumentList = formArgs.split('/');
  const hideCodeSample = () => {
    toggleSampleCode();
  };

  const argOffset = currentMethod === TRACE_CALL ? TRACE_ARGS_OFFSET : 0;

  return (
    <CodeSample
      url={atob(web3URL)}
      web3Lib={web3Lib}
      args={getCodeSampleFriendlyArguments(argumentList, abi, argOffset)}
      currentMethod={currentMethod}
      hideCodeSample={hideCodeSample}
      visible={codeSampleVisible}
    />
  );
};

export { CodeSampleContainer };
