import { fetchConfigVariable } from "../utils/handleConfigVars";
import {
  fetchCases as fetchCasesFirebase,
  getAssetDownloadUrl as getAssetFirebase
} from "../utils/firebase";
import {
  fetchCases as fetchCasesLocal,
  getAsset as getAssetLocal
} from "../utils/loadLocalAssets";

const fetchCases = async (configExists, path, cases, shuffle) => {
  let validCases;

  // firebase
  // validCases = await fetchCasesFirebase(configExists, path, cases, shuffle);

  // local
  validCases = fetchCasesLocal(configExists, path, cases, shuffle);

  return validCases;
};

const getAsset = async (path) => {
  const defaults = {
    assetsStorageType: "local",
    responsesStorageType: "download",
  };

  // read the configs. if the parameters under "storage" under "REACT_APP_general" are defined, use them; otherwise, use the default values
  const REACT_APP_general = fetchConfigVariable("REACT_APP_general");
  let config = defaults;
  if (REACT_APP_general && REACT_APP_general.storage) {
    config.assetsStorageType =
      REACT_APP_general.storage.assetsStorageType || defaults.assetsStorageType;
    config.responsesStorageType =
      REACT_APP_general.storage.responsesStorageType ||
      defaults.responsesStorageType;
  }

  let url = getAssetLocal(path);
  if (!url) {
    url = await getAssetFirebase(path);
  }
  return url;
};

export { fetchCases, getAsset };
