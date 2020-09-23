const ERROR_MESSAGE_PARSE_ABI =
  'Error parsing ABI. Please ensure valid JSON format. Example:\n\n[{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]';
const AVAILABLE_FUNCTIONS_MESSAGE = 'Available READ functions:';

export const getFunctionDisplayName = ({ name, inputs }) => {
  const inputTypesText = inputs.map(
    (input, index) => `${input.type}${index < inputs.length && ','}`
  );
  return `${name}${
    inputs.length > 0 ? ` (${inputs.length} inputs: ${inputTypesText})` : ''
  }`;
};

export const parseAbi = (rawAbi) => {
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
