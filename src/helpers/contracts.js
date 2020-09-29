const ERROR_MESSAGE_NO_ABI = 'No ABI provided';
const ERROR_MESSAGE_PARSE_ABI =
  'Error parsing ABI. Please ensure valid JSON format. Example: [{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]';
const AVAILABLE_FUNCTIONS_MESSAGE = 'Available READ functions:';

const getFunctionDisplayName = ({ name, inputs }) => {
  // Convert a function entity to a human-friendly string
  const inputTypesText = inputs.map(
    (input, index) => `${input.type}${index < inputs.length && ','}`
  );
  return `${name}${
    inputs.length > 0 ? ` (${inputs.length} inputs: ${inputTypesText})` : ''
  }`;
};

const valFromFunction = (func) => {
  // Convert a function entity to a URL-friendly string
  try {
    let functionObj = func;
    if (typeof func !== 'object') functionObj = JSON.parse(func);
    const inputTypes = functionObj.inputs.map(
      (input, index) =>
        `${input.type}${index < functionObj.inputs.length && '-'}`
    );
    return `${functionObj.name}${inputTypes}`;
  } catch (e) {
    console.log(e);
  }
};

export const functionFromVal = ({ val, abi }) => {
  return abi[0];
  // Convert a URL-friendly string to a function entity
};

const isValidUrl = (string) => {
  try {
    new URL(string);
  } catch (e) {
    return false;
  }
  return true;
};

export const getFilteredFunctions = (abi) => {
  try {
    return abi
      .filter((func) => func.stateMutability === 'view')
      .map((func) => ({
        value: valFromFunction(func),
        name: getFunctionDisplayName({
          name: func.name,
          inputs: func.inputs,
        }),
      }));
  } catch (e) {
    console.log(e);
  }
};

export const fetchOrParseAbi = (abiVal) => {
  if (!abiVal) return { error: ERROR_MESSAGE_NO_ABI };
  try {
    let abi = abiVal;
    if (isValidUrl(abiVal)) abi = fetch(abiVal);
    if (typeof abi !== 'object') abi = JSON.parse(abiVal);
    // Handle edge case when single function entity is passed
    if (!abi.length) abi = [abi];

    // console.log(
    //   AVAILABLE_FUNCTIONS_MESSAGE,
    //   filteredFunctions.map((func) => func.name)
    // );
    return { abi };
  } catch (e) {
    console.log(e);
    return { error: ERROR_MESSAGE_PARSE_ABI };
  }
};
