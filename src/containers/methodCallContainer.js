import React, { useContext, useCallback, useState, useEffect } from 'react';
import { NeedMethodMessage, NeedURLMessage, MethodCall } from '../components';
import { AppContext, LogContext } from '../context';
import Web3RpcCalls from '../helpers/web3Config';
import buildProvider from '../helpers/buildProvider';
import {
  fetchOrParseAbi,
  getFilteredMethods,
  getContractFriendlyArguments,
  getFormInputsFromMethod,
  onUpdateAbi,
} from '../helpers/contracts';
import { navigate, useParams } from '@reach/router';

const ETH_CALL = 'eth_call';
const TRACE_CALL = 'trace_call';
const TRACE_ARGS_OFFSET = 4;

const MethodCallContainer = () => {
  const params = useParams();
  const { codeSampleVisible, toggleSampleCode, abi, setAbi } = useContext(
    AppContext
  );
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
  const { args: initialFormInputs, exec } = web3Method[web3Lib] || {};

  const [formInputs, setFormInputs] = useState([]);
  const [argumentList, setArgumentList] = useState([]);

  // Logic when using contract method (eth_call, trace_call)
  const isContractMethod = [ETH_CALL, TRACE_CALL].includes(currentMethod);
  const argOffset = currentMethod === TRACE_CALL ? TRACE_ARGS_OFFSET : 0;
  const isWriteAllowed = argOffset > 0;

  const updateURL = (val, index) => {
    let argsList = formArgs.split('/').slice(0, formInputs.length); // Remove dangling arguments
    argsList[index] = val;
    let joinedArgs = argsList.join('/');
    let url = `/${web3URL}/${web3Lib}/`;
    if (currentMethod) url += `${currentMethod}/`;
    if (formInputs.length > 0) url += `${joinedArgs}`;
    navigate(url);
  };

  const onUpdateArguments = async (val, index) => {
    if (isContractMethod && index === 1 + argOffset) {
      // Prevent updating URL if ABI error
      const { error } = await fetchOrParseAbi(val, isWriteAllowed);
      if (error)
        return logItem({
          method: 'error',
          data: ['🚨 Error:', error],
        });
      return updateURL(btoa(val), index);
    }
    updateURL(val, index);
  };

  const runRequest = () => {
    logItem({
      method: 'info',
      data: [`🚀 Sending request for **${currentMethod}**:`],
    });
    const [provider, proto] = buildProvider(web3Lib, atob(web3URL));
    let args = argumentList.slice();
    // Pre-flight conversion for contract calls
    if (isContractMethod)
      args = getContractFriendlyArguments(args, abi, argOffset);
    exec(provider, proto, ...args)
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

  const loadURL = async () => {
    const list = formArgs.split('/');
    if (isContractMethod && list[1 + argOffset]) {
      // Load ABI
      try {
        list[1 + argOffset] = atob(list[1 + argOffset]);
        const { error, abi } = await fetchOrParseAbi(
          list[1 + argOffset],
          isWriteAllowed
        );
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
    setArgumentList(list);
  };

  // Load URL arguments
  useEffect(() => {
    loadURL();
  }, [formArgs, currentMethod, formInputs]);

  useEffect(() => {
    if (!abi) return;
    const { newFormInputs, newUrl } = onUpdateAbi(abi, formInputs, argOffset);
    setFormInputs(newFormInputs);
    if (newUrl) updateURL(newUrl, 2 + argOffset);
  }, [abi, formInputs]);

  // Update the form inputs whenever a new contract method is selected
  useEffect(() => {
    if (!argumentList) return;
    const methodId = argumentList[2 + argOffset];
    if (!methodId || !abi) return; //setFormInputs(formInputs);
    setFormInputs(
      getFormInputsFromMethod(abi, methodId, formInputs, argOffset)
    );
  }, [argumentList[2 + argOffset]]);

  useEffect(() => {
    if (!initialFormInputs) return;
    setFormInputs(initialFormInputs);
  }, [initialFormInputs]);

  const contextProps = {
    codeSampleVisible,
    toggleSampleCode,
    currentMethod,
    web3Lib,
    web3URL,
    description,
    disabled,
    args: formInputs,
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
