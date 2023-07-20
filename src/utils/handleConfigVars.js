import configuration from "../config.json";

/**
 * fetch a config variable from the config file or from the environment variables. The environment variables have priority
 * @param {string} param the name of the variable
 * @returns {string|object|Array } the value of the variable
 */
const fetchConfigVariable = (param) => {
  return process.env[param] !== undefined ? process.env[param] : configuration[param];
};

/**
 * fetch a batch of config variables from the config file or from the environment variables. The environment variables have priority
 * @param {Array} parameters the names of the variables
 * @returns {object} an object with the same keys as the input array containing the values of the variables
 */
const fetchConfigVariablesBatch = (parameters) => {
  let result = {};
  parameters.map((parameter) => {
    result[parameter] = fetchConfigVariable(parameter);
    return null;
  });
  return result;
};

export { fetchConfigVariable, fetchConfigVariablesBatch };
