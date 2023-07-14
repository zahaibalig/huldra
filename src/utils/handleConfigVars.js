import configuration from "../config.json";
import _ from "lodash";

/**
 * check if a string is a valid JSON string
 * @param {string} str the string to check
 * @returns {boolean} true if the string is a valid JSON string, false otherwise
 */
const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};

/**
 * customizer function for deep merging two objects
 * @param {object} objValue the value of the object
 * @param {object} srcValue the value of the source object
 * @returns {object} the merged object
 * @see https://lodash.com/docs/4.17.15#mergeWith
 */
const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

/**
 * fetch a config variable from the config file or from the environment variables. the environment variables have priority. supports deep merging of objects
 * We support deep merging of variables between the config file and environment variables. This allows us to override specific parts of an object variable in the config file with environment variables. For example, we can override one key of a three-key object variable with an environment variable, while keeping the other two keys unchanged. However, we caution **against** using more than two levels of nesting, as it might lead to confusion and unexpected outcomes.
 * @param {string} param the name of the variable
 * @returns {string|object|Array } the value of the variable
 */
const fetchConfigVariable = (param) => {
  // read from environment variables
  const envVarRaw = process.env[param];
  const configVar = configuration[param];

  let result;

  // if the environment variable does not exist, use the variable from the config file
  if (envVarRaw === undefined) {
    result = configVar;
  } else {
    // if the environment variable exists and is not a valid JSON string, use the environment variable
    if (!isJsonString(envVarRaw)) {
      result = envVarRaw;
    } else {
      // if the environment variable exists and is a valid JSON string, parse it
      // and deep merge it with the variable from the config file
      // the environment variable has priority
      const envVarObj = JSON.parse(envVarRaw);
      result = _.mergeWith(configVar, envVarObj, customizer);
    }
  }

  return result;
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
