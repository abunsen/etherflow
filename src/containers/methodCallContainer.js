import React, { useContext, useCallback, useState } from 'react';
import { NeedMethodMessage, NeedURLMessage, MethodCall } from '../components';
import { AppContext, LogContext } from '../context';
import Web3RpcCalls from '../helpers/web3Config';
import buildProvider from '../helpers/buildProvider';
import { navigate, useParams } from '@reach/router';

const CONTRACT_FUNCTION_METHOD = 'contract_function';
const ERROR_MESSAGE_PARSE_ABI =
  'Error parsing ABI. Please ensure valid JSON format. Example:\n\n[{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]';
const AVAILABLE_FUNCTIONS_MESSAGE = 'Available READ functions:';

const MethodCallContainer = () => {
  const params = useParams();
  const { codeSampleVisible, toggleSampleCode } = useContext(AppContext);
  const { addToLog } = useContext(LogContext);
  const logItem = useCallback(addToLog, []);
  const {
    web3URL = '',
    web3Lib = '',
    currentMethod = '',
    formArgs = '',
  } = params;
  const argumentList = formArgs.split('/');
  const web3Method = Web3RpcCalls[currentMethod] || {};
  const { description, disabled } = web3Method || {};
  const { args, exec } = web3Method[web3Lib] || {};

  const [argsWithAbi, setArgsWithAbi] = useState(args);

  const getFunctionDisplayName = ({ name, inputs }) => {
    const inputTypesText = inputs.map(
      (input, index) => `${input.type}${index < inputs.length && ','}`
    );
    return `${name}${
      inputs.length > 0 ? ` (${inputs.length} inputs: ${inputTypesText})` : ''
    }`;
  };

  const parseAbi = (rawAbi) => {
    try {
      const parsedAbi = JSON.parse(rawAbi);
      // TODO: Filter write functions
      const filteredFunctions = parsedAbi
        .filter((func) => func.stateMutability === 'view')
        .map((func) => ({
          ...func,
          displayName: getFunctionDisplayName({
            name: func.name,
            inputs: func.inputs,
          }),
        }));
      console.log(
        AVAILABLE_FUNCTIONS_MESSAGE,
        filteredFunctions.map((func) => func.name)
      );
      return { abi: parsedAbi, filteredFunctions };
    } catch (e) {
      return { error: ERROR_MESSAGE_PARSE_ABI };
    }
  };

  const setAbiArgument = (newAbi, index) => {
    if (index === 1) {
      // ABI changed. Update method choices
      const { error, parsedAbi } = parseAbi(newAbi);
      if (error) return console.log(error);
      // Update args with new function options
      const argsCopy = argsWithAbi;
      argsCopy[3] = { ...args[3], functionNames: ['func1'] };
      setArgsWithAbi(argsCopy);
      // Update URL
    }
    if (index === 2) {
      // Function changed. Update URL with new ABI snippet
    }
    // subsequent argument changed, update URL
  };

  const setArgumentList = (val, index) => {
    if (currentMethod === CONTRACT_FUNCTION_METHOD)
      return setAbiArgument(val, index);
    const argsCopy = [...argumentList];
    argsCopy[index] = val;
    // bad pattern?
    // TODO: Break into separate function
    let joinedArgs = argsCopy.join('/');
    let url = `/${web3URL}/${web3Lib}/`;
    if (currentMethod) url += `${currentMethod}/`;
    if (args.length > 0) url += `${joinedArgs}`;
    navigate(url);
  };

  const runRequest = (args) => {
    logItem({
      method: 'info',
      data: [`🚀 Sending request for **${currentMethod}**:`],
    });
    const [provider, proto] = buildProvider(web3Lib, atob(web3URL));
    exec(provider, proto, ...argumentList)
      .then((response) => {
        logItem({
          method: 'info',
          data: [`✅ Node response:`, response],
        });
      })
      .catch((err) => {
        logItem({
          method: 'error',
          data: ['🚨 Error response:', err],
        });
      });
  };
  const contextProps = {
    codeSampleVisible,
    toggleSampleCode,
    currentMethod,
    web3Lib,
    web3URL,
    description,
    disabled,
    args: argsWithAbi,
    runRequest,
    setArgumentList,
    argumentList,
  };

  if (!web3URL) {
    return (
      <div className="w-3/12 py-2 px-4 border-r border-gray-200 shadow-md h-screen">
        <NeedURLMessage />
      </div>
    );
  }
  if (!currentMethod) {
    return (
      <div className="w-3/12 py-2 px-4 border-r border-gray-200 shadow-md h-screen">
        <NeedMethodMessage />
      </div>
    );
  }

  return <MethodCall {...contextProps} />;
};

export { MethodCallContainer };
