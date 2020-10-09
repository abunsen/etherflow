const ERROR_MESSAGE_NO_ABI = 'No ABI provided';
const ERROR_MESSAGE_PARSE_ABI =
  'Error parsing ABI. Please ensure valid JSON format. Example: [{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]';
const ERROR_MESSAGE_ABI_TOO_LONG = 'Please only pass one function object.';
const ERROR_MESSAGE_ABI_NO_READ_FUNCTIONS =
  'The ABI does not contain any READ functions.';
const ERROR_MESSAGE_FETCH = 'Error fetching ABI. CORS header may not be set.';

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

const getFragmentFromMethodId = (abi, methodId) => {
  const [methodName, argTypes] = methodId.split('-');
  const typesList = argTypes ? argTypes.split(',') : [];
  if (abi.length === 1) return abi[0];
  return abi.find((element) => {
    if (element.name !== methodName) return false;
    const inputTypes = element.inputs.map((input) => input.type);
    return (
      inputTypes.length === typesList.length &&
      inputTypes.every((value, i) => value === typesList[i])
    );
  });
};

const PLACEHOLDER_BASE_TYPE = {
  int: '255',
  bool: 'true',
  address: '0x261b45d85ccfeabb11f022eba346ee8d1cd488c0',
  string: 'example text',
  byte: '01',
};

export const getArgumentsFromMethodId = (abi, methodId) => {
  /* eslint-disable-next-line no-unused-vars*/
  const [_, rawArgs] = methodId.split('-');
  if (!rawArgs) return;
  const args = rawArgs.split(',');
  const abiFragment = getFragmentFromMethodId(abi, methodId);
  return args.map((arg, index) => {
    const baseType = arg
      .replace(/(uint|int)[0-9]*/, 'int')
      .replace(/(byte|bytes)[0-9]*/, 'byte')
      .replace(/\[\]/, '');
    let placeholder = PLACEHOLDER_BASE_TYPE[baseType];
    const isArray = /\[\]/.test(arg);
    if (isArray) placeholder = `${placeholder}, ${placeholder}`;
    return {
      type: isArray ? 'textarea' : 'textfield',
      description: abiFragment.inputs[index].name || arg,
      placeholder: `i.e. ${placeholder}`,
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
      let response = null;
      try {
        response = await fetch(abiVal);
      } catch (e) {
        return { error: ERROR_MESSAGE_FETCH };
      }
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
  return args.map((arg) => {
    if (/,/.test(arg)) {
      // Array value

      return arg.split(',');
    }
    return `${arg}`;
  });
};

export const getContractFriendlyArguments = (argumentList, abi, argOffset) => {
  /* eslint-disable-next-line no-unused-vars*/
  let list = argumentList;
  const traceArgs = list.splice(0, argOffset); // remove trace arguments (if any)
  let [address, _, methodId, ...methodSpecificArgs] = list;
  if (!methodId || !abi) return list;
  const [methodName, argTypes] = methodId.split('-');
  const typesList = argTypes ? argTypes.split(',') : [];
  // Pick out the relevant function fragment
  const abiFragment = [getFragmentFromMethodId(abi, methodId)];
  let args = [address, JSON.stringify(abiFragment), methodName];
  if (argTypes) args.push(...formatContractArgs(methodSpecificArgs, typesList));
  return traceArgs.concat(args); // add back trace arguments
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

export const getFormInputsFromMethod = (
  abi,
  methodId,
  formInputs,
  argOffset
) => {
  if (!methodId) return;
  const newFormInputs = getArgumentsFromMethodId(abi, methodId);
  if (newFormInputs)
    return [
      ...formInputs.slice(0, 3 + argOffset), // Discard existing method-specific inputs
      ...newFormInputs,
    ];
  else return [...formInputs.slice(0, 3 + argOffset)];
};

export const onUpdateAbi = (abi, formInputs, argOffset) => {
  const filteredMethods = getFilteredMethods(abi);
  const formInputsCopy = formInputs;
  formInputsCopy[2 + argOffset] = {
    ...formInputs[2 + argOffset],
    dropdownOptions: filteredMethods,
    disabled: abi.length === 1,
  };
  let newUrl = null;
  if (abi.length === 1) newUrl = filteredMethods[0].value;
  return { newFormInputs: formInputsCopy, newUrl };
};
