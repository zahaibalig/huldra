import { fetchConfigVariable } from "./handleConfigVars";

/**
 * read from config.json. use the default values if the parameters are not defined
 * @returns {object} - the config object for storage
 * @property {string} assetsStorageType - the type of storage for assets (local or firebase)
 * @property {string} responsesStorageType - the type of storage for responses (download or firebase)
 */
const getConfig = () => {
  const defaults = {
    assetsStorageType: "local",
    responsesStorageType: "download",
  };

  const REACT_APP_general = fetchConfigVariable("REACT_APP_general");
  let config = defaults;
  if (REACT_APP_general && REACT_APP_general.storage) {
    config.assetsStorageType =
      REACT_APP_general.storage.assetsStorageType || defaults.assetsStorageType;
    config.responsesStorageType =
      REACT_APP_general.storage.responsesStorageType ||
      defaults.responsesStorageType;
  }

  return config;
};

export default getConfig;
