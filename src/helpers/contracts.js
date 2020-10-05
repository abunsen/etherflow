const ERROR_MESSAGE_NO_ABI = 'No ABI provided';
const ERROR_MESSAGE_PARSE_ABI =
  'Error parsing ABI. Please ensure valid JSON format. Example: [{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]';
const ERROR_MESSAGE_ABI_TOO_LONG = 'Please only pass one function object.';
const ERROR_MESSAGE_ABI_NO_READ_FUNCTIONS =
  'The ABI does not contain any READ functions.';

const getMethodDisplayName = ({ name, inputs }) => {
  // Convert a function entity to a human-friendly string
  const inputTypesText = inputs.map((input, index) => input.type);
  return `${name}${inputs.length > 0 ? ` (${inputTypesText})` : ''}`;
};

const getMethodId = ({ name, inputs }) => {
  // Convert a function to a unique ID
  const inputTypesText = inputs.map((input, index) => input.type);
  return `${name}${inputs.length > 0 ? `-${inputTypesText}` : ''}`;
};

export const getArgumentsFromMethodId = (methodId) => {
  /* eslint-disable-next-line no-unused-vars*/
  const [_, rawArgs] = methodId.split('-');
  if (!rawArgs) return;
  const args = rawArgs.split(',');
  return args.map((arg, index) => {
    return {
      type: 'textfield',
      description: `Argument #${index + 1}`,
      placeholder: arg,
    };
  });
};

const isValidUrl = (string) => {
  try {
    new URL(string);
  } catch (e) {
    return false;
  }
  return true;
};

export const getFilteredMethods = (abi) => {
  try {
    return abi
      .filter((method) => method.stateMutability === 'view')
      .map((method) => ({
        value: getMethodId(method),
        name: getMethodDisplayName(method),
      }));
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const fetchOrParseAbi = async (abiVal) => {
  if (!abiVal) return { error: ERROR_MESSAGE_NO_ABI };
  try {
    let abi = abiVal;
    if (isValidUrl(abiVal)) {
      const response = await fetch(abiVal);
      const json = await response.json();
      if (Array.isArray(json)) abi = json;
      else abi = json.abi;
    }
    if (typeof abi !== 'object') abi = JSON.parse(abiVal);
    if (!isValidUrl(abiVal) && abi.length > 1)
      return { error: ERROR_MESSAGE_ABI_TOO_LONG };
    // Handle edge case when single function entity is passed
    if (!abi.length) abi = [abi];
    const filteredMethods = getFilteredMethods(abi);
    if (filteredMethods.length === 0)
      return { error: ERROR_MESSAGE_ABI_NO_READ_FUNCTIONS };
    return { abi };
  } catch (e) {
    console.log(e);
    return { error: ERROR_MESSAGE_PARSE_ABI };
  }
};

export const formatContractArgs = (args, types) => {
  if (!args || !types) return null;
  return args.map((arg) => `${arg}`);
};

export const getContractFriendlyArguments = (argumentList, abi) => {
  /* eslint-disable-next-line no-unused-vars*/
  let [address, _, methodId, ...methodSpecificArgs] = argumentList;
  if (!methodId || !abi) return argumentList;
  const [methodName, argTypes] = methodId.split('-');
  const typesList = argTypes ? argTypes.split(',') : [];
  // Pick the relevant function fragment
  let abiFragment = abi;
  if (abi.length > 1)
    abiFragment = [
      abi.find((element) => {
        if (element.name !== methodName) return false;
        const inputTypes = element.inputs.map((input) => input.type);
        return (
          inputTypes.length === typesList.length &&
          inputTypes.every((value, i) => value === typesList[i])
        );
      }),
    ];
  const args = [address, JSON.stringify(abiFragment), methodName];
  if (argTypes) args.push(...formatContractArgs(methodSpecificArgs, typesList));
  return args;
};

export const getCodeSampleFriendlyArguments = (argumentList, abi) => {
  const [
    contract,
    cleanAbi,
    methodId,
    ...methodSpecificArgs
  ] = getContractFriendlyArguments(argumentList, abi);
  return [
    contract,
    cleanAbi,
    methodId,
    JSON.stringify(methodSpecificArgs).replace(/^\[/, '').replace(/\]$/, ''),
  ];
};

export const getFormInputsFromMethod = (methodId, formInputs) => {
  if (!methodId) return;
  const newFormInputs = getArgumentsFromMethodId(methodId);
  if (newFormInputs)
    return [
      ...formInputs.slice(0, 3), // Discard existing method-specific inputs
      ...newFormInputs,
    ];
  else return [...formInputs.slice(0, 3)];
};

export const onUpdateAbi = (abi, formInputs) => {
  const filteredMethods = getFilteredMethods(abi);
  const formInputsCopy = formInputs;
  formInputsCopy[2] = {
    ...formInputs[2],
    dropdownOptions: filteredMethods,
    disabled: abi.length === 1,
  };
  let newUrl = null;
  if (abi.length === 1) newUrl = filteredMethods[0].value;
  return { newFormInputs: formInputsCopy, newUrl };
};
