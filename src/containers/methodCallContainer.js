import React, { useContext, useCallback, useState, useEffect } from 'react';
import { NeedMethodMessage, NeedURLMessage, MethodCall } from '../components';
import { AppContext, LogContext } from '../context';
import Web3RpcCalls from '../helpers/web3Config';
import buildProvider from '../helpers/buildProvider';
import { parseAbi, functionFromVal } from '../helpers/abi';
import { navigate, useParams } from '@reach/router';

const CONTRACT_FUNCTION_METHOD = 'contract_function';

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

  const web3Method = Web3RpcCalls[currentMethod] || {};
  const { description, disabled } = web3Method || {};
  const { args, exec } = web3Method[web3Lib] || {};

  const [argsWithAbi, setArgsWithAbi] = useState(args);
  const [argumentList, setArgumentList] = useState([]);
  const [abi, setAbi] = useState([]);

  const updateURL = (val, index) => {
    const argsCopy = [...argumentList];
    argsCopy[index] = val;
    // bad pattern?
    let joinedArgs = argsCopy.join('/');
    let url = `/${web3URL}/${web3Lib}/`;
    if (currentMethod) url += `${currentMethod}/`;
    if (args.length > 0) url += `${joinedArgs}`;
    navigate(url);
  };

  const setContractFunctionArgument = (val, index) => {
    if (index === 1) {
      // ABI changed. Update the avaialable dropdown options with the function
      const { error, abi, filteredFunctions } = parseAbi(val);
      if (error)
        return logItem({
          method: 'error',
          data: ['🚨 Error:', error],
        });
      setAbi(abi);
      const argsCopy = argsWithAbi;
      argsCopy[2] = { ...args[2], dropdownOptions: filteredFunctions };
      return setArgsWithAbi(argsCopy);
    }
    if (index === 2) {
      // Function changed. Update function name
      updateURL(val, index);
      // Update URL with new ABI snippet
      const newAbi = functionFromVal({ val, abi });
      return updateURL(btoa(newAbi), 1);
    }
    return updateURL(val, index); // All other cases, just update the URL
  };

  const parseFormArgs = (args) => {
    // Enable Base64 encoding
    const list = args.split('/').map((arg) => {
      if (/[A-Za-z0-9+/=]\=$/.test(arg)) {
        // This is an ABI function entity!
        const decoded = atob(arg);
        setContractFunctionArgument(decoded, 1);
        return decoded;
      }
      return arg;
    });
    setArgumentList(list);
  };

  useEffect(() => {
    parseFormArgs(formArgs);
  }, [formArgs]);

  const onUpdateArguments = (val, index) => {
    if (currentMethod === CONTRACT_FUNCTION_METHOD)
      return setContractFunctionArgument(val, index);
    updateURL(val, index);
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
    onUpdateArguments,
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
