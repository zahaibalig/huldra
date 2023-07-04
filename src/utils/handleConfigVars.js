import configuration from "../config.json";
const fetchConfigVariable = (param) => {
  return process.env[param] !== undefined ? process.env[param] : configuration[param];
};

const fetchConfigVariablesBatch = (parameters) => {
  let result = {};
  parameters.map((parameter) => {
    result[parameter] = fetchConfigVariable(parameter);
    return null;
  });
  return result;
};
const fetchConfigVariableValuesNested = (parameter, subParameter) => {
  return typeof configuration[parameter] === "object"
    ? Object(configuration[parameter][subParameter])
    : fetchConfigVariable(parameter);
};

const fetchConfigVariableValues = (parameter) => {
  return typeof configuration[parameter] === "object"
    ? Object.values(configuration[parameter])
    : fetchConfigVariable(parameter);
};
export {
  fetchConfigVariable,
  fetchConfigVariablesBatch,
  fetchConfigVariableValues,
  fetchConfigVariableValuesNested,
};
