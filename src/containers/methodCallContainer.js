import React, { useContext, useCallback, useState, useEffect } from 'react';
import { NeedMethodMessage, NeedURLMessage, MethodCall } from '../components';
import { AppContext, LogContext } from '../context';
import Web3RpcCalls from '../helpers/web3Config';
import buildProvider from '../helpers/buildProvider';
import {
  fetchOrParseAbi,
  getFilteredMethods,
  getArgumentsFromMethodId,
  parseMethodArgs,
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
  const { args: initialFormInputs, exec } = web3Method[web3Lib] || {};

  const [formInputs, setFormInputs] = useState([]);
  const [argumentList, setArgumentList] = useState([]);
  const [abi, setAbi] = useState(null);

  const updateURL = (val, index) => {
    const argsList = formArgs.split('/');
    argsList[index] = val;
    let joinedArgs = argsList.join('/');
    let url = `/${web3URL}/${web3Lib}/`;
    if (currentMethod) url += `${currentMethod}/`;
    if (formInputs.length > 0) url += `${joinedArgs}`;
    navigate(url);
  };

  const onUpdateContractMethod = (methodId) => {
    const newFormInputs = getArgumentsFromMethodId(methodId);
    if (newFormInputs)
      return setFormInputs([
        ...formInputs.slice(0, 3), // Discard existing method-specific inputs
        ...newFormInputs,
      ]);
    setFormInputs([...formInputs.slice(0, 3)]);
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
    const formInputsCopy = formInputs;
    formInputsCopy[2] = {
      ...formInputs[2],
      dropdownOptions: filteredMethods,
      disabled: abi.length === 1,
    };
    setFormInputs(formInputsCopy);
    // If only one method, set it and disable the form
    if (abi.length === 1 && filteredMethods[0])
      onUpdateArguments(filteredMethods[0].value, 2);
  };

  const runRequest = () => {
    logItem({
      method: 'info',
      data: [`🚀 Sending request for **${currentMethod}**:`],
    });
    const [provider, proto] = buildProvider(web3Lib, atob(web3URL));
    let args = argumentList.slice();
    if (currentMethod === CONTRACT_FUNCTION_METHOD) {
      const [address, , methodId, ...methodSpecificArgs] = argumentList;
      const [methodName, types] = methodId.split('-');
      args = [
        address,
        abi,
        methodName,
        ...parseMethodArgs(methodSpecificArgs, types.split(',')),
      ];
    }
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

  useEffect(() => {
    if (!initialFormInputs || !initialFormInputs.length) return;
    console.log(initialFormInputs);
    setFormInputs(initialFormInputs);
  }, [initialFormInputs]);

  // Parse URL arguments
  useEffect(() => {
    parseURL();
  }, [formArgs]);

  const isFormValid = argumentList[0] && argumentList[1] && argumentList[2];

  const contextProps = {
    codeSampleVisible,
    toggleSampleCode,
    currentMethod,
    web3Lib,
    web3URL,
    description,
    disabled: disabled || !isFormValid,
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
