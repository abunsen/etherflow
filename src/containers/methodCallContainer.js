import React, { useContext, useCallback, useState, useEffect } from 'react';
import { NeedMethodMessage, NeedURLMessage, MethodCall } from '../components';
import { AppContext, LogContext } from '../context';
import Web3RpcCalls from '../helpers/web3Config';
import buildProvider from '../helpers/buildProvider';
import {
  fetchOrParseAbi,
  getFilteredMethods,
  getArgumentsFromMethodId,
} from '../helpers/contracts';
import { navigate, useParams } from '@reach/router';

const CONTRACT_FUNCTION_METHOD = 'eth_call';
const ERROR_MESSAGE_ISSUE_DECODING = 'Error decoding the URL';

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
  const { args: methodArgs, exec } = web3Method[web3Lib] || {};

  const [availableArgs, setAvailableArgs] = useState(methodArgs);
  const [argumentList, setArgumentList] = useState([]);
  const [abi, setAbi] = useState(null);

  const updateURL = (val, index) => {
    const argsCopy = formArgs.split('/');
    argsCopy[index] = val;
    // bad pattern?
    let joinedArgs = argsCopy.join('/');
    let url = `/${web3URL}/${web3Lib}/`;
    if (currentMethod) url += `${currentMethod}/`;
    if (availableArgs.length > 0) url += `${joinedArgs}`;
    navigate(url);
  };

  const onUpdateContractMethod = (methodId) => {
    const newAvailableArguments = getArgumentsFromMethodId(methodId);
    if (newAvailableArguments)
      return setAvailableArgs([
        ...availableArgs.slice(0, 3), // Discard method-specific arguments
        ...newAvailableArguments,
      ]);
    setAvailableArgs([...availableArgs.slice(0, 3)]);
  };

  const onUpdateArguments = (val, index) => {
    let valEncoded = val;
    if (currentMethod === CONTRACT_FUNCTION_METHOD) {
      if (index === 1) valEncoded = btoa(val);
      if (index === 2) onUpdateContractMethod(val);
    }
    updateURL(valEncoded, index);
  };

  const onUpdateAbi = () => {
    const filteredMethods = getFilteredMethods(abi);
    const availableArgsCopy = availableArgs;
    availableArgsCopy[2] = {
      ...availableArgs[2],
      dropdownOptions: filteredMethods,
      disabled: abi.length === 1,
    };
    setAvailableArgs(availableArgsCopy);
    // If only one method, set it and disable the form
    if (abi.length === 1 && filteredMethods[0])
      onUpdateArguments(filteredMethods[0].value, 2);
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

  const parseURL = async () => {
    const list = formArgs.split('/');
    if (currentMethod === CONTRACT_FUNCTION_METHOD) {
      // Load the ABI
      if (list[1]) {
        try {
          list[1] = atob(list[1]);
          const { error, abi } = await fetchOrParseAbi(list[1]);
          if (error)
            return logItem({
              method: 'error',
              data: ['🚨 Error:', error],
            });
          setAbi(abi);
        } catch (e) {
          console.log(e);
        }
      }
      // Update selected contract method
      if (list[2]) onUpdateArguments(list[2], 2);
    }
    setArgumentList(list);
  };

  useEffect(() => {
    if (!abi) return;
    onUpdateAbi();
  }, [abi]);

  // Parse URL arguments
  useEffect(() => {
    parseURL();
  }, [formArgs]);

  const contextProps = {
    codeSampleVisible,
    toggleSampleCode,
    currentMethod,
    web3Lib,
    web3URL,
    description,
    disabled,
    args: availableArgs,
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
